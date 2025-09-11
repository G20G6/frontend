<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import { MessageCircle, Send, SendHorizonal, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { itinerary } from '../../../routes/discover/controller.svelte';
	import { MessageDotsOutline } from 'flowbite-svelte-icons';
	import { experiences } from '../../../routes/discover/model';
	import { goto } from '$app/navigation';
	import { generateItineraryPDF } from '$lib';

	// State management
	let isOpen = $state(false);
	let messages = $state([{ text: 'What’s your vibe? Food, culture, adventure?', sender: 'ai' }]);
	let userInput = $state('');
	let messagesContainer: HTMLDivElement = $state(null);
	// Reference to messages div
	const itineraryTemplate = {
		itineraryName: 'Trip to [Location]',
		duration: '[Number of days]',
		budget: '[Budget details]',
		dailyPlan: [
			{
				day: 1,
				theme: '[Theme for the day, focusing on rural/township experience]',
				experiences: []
			}
		]
	};
	// Track current page context
	let currentPage = $state('home');

	// Toggle chat window
	const toggleChat = () => {
		isOpen = !isOpen;
	};

	let isTyping = $state(false);

	// Handle sending messages
	const sendMessage = async () => {
		if (userInput.trim() === '') return;

		let tempUserInput = userInput;
		userInput = '';
		// Add user message
		messages = [...messages, { text: tempUserInput, sender: 'user' }];

		isTyping = true;

		tempUserInput += `
				Context: {
				aiPreviousActions: ${JSON.stringify(messages)},
				instruction: "You are an agent for a non-tech user on our app. NEVER REVEAL YOU ARE AN AI. 
					You must return a JSON object, not a string. When asked to do something, DO NOT ask questions. Only DO what you are asked!
					Output format must be:
					{
					message: string, 
					functions: [
						{ name: string, argument: string }
					]
					}",
				currency: "ZAR",
				itineraryTemplate: ${JSON.stringify(itineraryTemplate)},
				page: ${page.url.pathname},
				userItinerary: ${JSON.stringify(itinerary.get())},
				functions: {
					goToBooking(): "Navigate to the booking page",
					addToItinerary(id): "Add an experience to the itinerary by ID",
					generateItineraryPDF(): "Generate or Print a PDF of the current itinerary.",
					removeFromItinerary(id): "Remove an experience from the itinerary by id",
					clearItinerary(): "Clear the entire itinerary",
					search(term): "Search by term, if user wants to view more experiences, 
					it navigates them, if they ask for something specific, you can search for them if necessary, they won't explicitly ask for this"
				},
				data: {
					experiences: ${JSON.stringify(experiences)}
				},
				important!: "When they say a number of days, it is consecutive days, don't make a gap in the days
				.Do not make up IDs or functions. Only use IDs present in 'data.experiences'.
				If the user asks for an experience not in the list, inform them we don't have it.
				When asked to create an itinerary, while the current itinerary is not empty, remove the other experiences and leave only the experiences that fit the budget.
					When creating an itinerary, ensure it is realistic and logistically possible.
					Make sure the itinerary is filled, using replaceItinerary function if necessary. 
					It is almost impossible to travel to other provinces in one day, so make sure the itinerary makes sense.
					The experiences should match the user's vibe and preferences.
					The experiences should not be a lot of days apart,
					If given a budget, make sure the itinerary fits within that budget, not too small or too much.
					Only use the listed functions. Reject requests unrelated to assistance, ALWAYS RETURN THE JSON OBJECT."
				}`;

		const req = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ prompt: tempUserInput }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = await req.json();

		let raw = res.response.trim();

		// strip fences if present
		if (raw.startsWith('```')) {
			raw = raw.replace(/^```json/, '').replace(/```$/, '');
		}

		let parsed;
		try {
			parsed = JSON.parse(raw);
		} catch (err) {
			messages = [
				...messages,
				{
					text: "I'm sorry, I couldn't understand that. Could you please rephrase?",
					sender: 'ai'
				}
			];
			isTyping = false;
			return;
		}

		const { message, functions } = parsed;

		// validate shape
		if (!Array.isArray(functions)) {
			console.error('Functions not in array format:', functions);
			return;
		}

		// allowed functions
		const toolRegistry = {
			goToBooking: () => {
				goto('/booking');
			},
			clearItinerary: () => {
				itinerary.clear();
				localStorage.removeItem('itinerary');
			},
			addToItinerary: (id) => {
				const exp = experiences.find((exp) => exp.id === Number(id));
				if (!exp) {
					console.error('Invalid experience ID:', id);
					return;
				}
				itinerary.add(exp);
				itinerary.openModal();
			},
			removeFromItinerary: (id) => {
				const index = experiences.findIndex((exp) => exp.id === Number(id));
				if (index === -1) {
					console.error('Invalid experience ID:', id);
					return;
				}
				itinerary.remove(index);
			},
			search: (term: string) => {
				goto(`/discover?search=${term.toLowerCase().replace(' ', '-')}`);
			},
			generateItineraryPDF: () => {
				generateItineraryPDF(itinerary);
			}
		};

		// run the functions
		for (const func of functions) {
			if (toolRegistry[func.name]) {
				toolRegistry[func.name](func.argument);
			} else {
				console.error('Unknown function:', func.name);
			}
		}

		//When error occurs, add error message and return the user input back to the form.
		if (res.error) {
			isTyping = false;
			messages = [...messages, { text: res.error, sender: 'ai' }];
			userInput = tempUserInput;
			return;
		}
		//When the response is successful
		// Add AI response
		isTyping = false;
		messages = [...messages, { text: message, sender: 'ai' }];
	};

	// Handle Enter key press
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (userInput.length > 0) sendMessage();
		}
	};

	// Auto-scroll to bottom when messages update
	$effect(() => {
		if (messagesContainer && messages.length > 0) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	});

	onMount(() => {
		const path = page.url.pathname;
		if (path.includes('booking')) {
			currentPage = 'booking';
		} else if (path.includes('profile')) {
			currentPage = 'profile';
		} else {
			currentPage = 'home';
		}
	});
</script>

<div class="">
	<!-- Chat Toggle Button -->
	{#if !isOpen}
		<div transition:scale={{ delay: 300 }}>
			<Button
				color="secondary"
				class="px-3 py-2 text-sm shadow-lg sm:px-4 sm:text-base"
				onclick={toggleChat}
			>
				<span class="flex items-center gap-2"> <MessageCircle /> KhayaAI </span>
			</Button>
		</div>
	{/if}

	<!-- Chat Window -->
	{#if isOpen}
		<div
			transition:scale={{ duration: 300 }}
			class="fixed right-0 bottom-0 z-50 flex h-[88svh] w-[100vw] flex-col bg-white shadow-xl sm:right-6 sm:bottom-6 sm:max-w-[400px] lg:right-4 lg:bottom-4 lg:rounded-lg"
		>
			<!-- Header -->
			<div
				class="z-50 flex items-center justify-between bg-primary-600 p-3 text-white sm:p-4 lg:rounded-t-lg"
			>
				<span class="text-sm font-semibold sm:text-base"
					>{page.url.pathname === '/discover' ? 'KhayaAI Concierge' : 'KhayaAI'}</span
				>
				<Button color="alternative" class="p-1" onclick={toggleChat}>
					<X size={18} />
				</Button>
			</div>

			<!-- Messages -->
			<div bind:this={messagesContainer} class="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4">
				{#each messages as message}
					<div
						transition:scale={{ duration: 300 }}
						class={`mb-3 w-fit max-w-[80%] rounded-lg p-2 text-sm whitespace-pre-wrap sm:text-base ${
							message.sender === 'user'
								? 'ml-auto bg-primary-100 text-primary-800'
								: 'bg-gray-200 text-gray-800'
						}`}
					>
						{message.text}
					</div>
				{/each}

				{#if isTyping}
					<div
						transition:scale={{ duration: 300 }}
						class="a mb-3 flex w-fit animate-bounce items-center gap-2 rounded-lg bg-gray-200 p-2 text-xs text-gray-800"
					>
						<MessageDotsOutline />typing...
					</div>
				{/if}
			</div>

			<!-- Input -->
			<div class="border-t bg-white p-3 sm:p-4">
				<div class="flex gap-2">
					<Input
						bind:value={userInput}
						placeholder="Type your message..."
						class="flex-1 text-sm sm:text-base"
						onkeydown={handleKeyPress}
					/>
					<Button color="primary" class="p-2" onclick={sendMessage}>
						<SendHorizonal />
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Scrollbar styling for chat window */
	::-webkit-scrollbar {
		width: 6px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 3px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	/* Smooth scrolling for mobile */
	:global(.overflow-y-auto) {
		scroll-behavior: smooth;
	}
</style>
