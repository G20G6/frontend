<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import { MessageCircle, Send, SendHorizonal, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { itinerary } from '../../../routes/discover/controller.svelte';
	import { MessageDotsOutline } from 'flowbite-svelte-icons';

	// State management
	let isOpen = $state(false);
	let messages = $state([{ text: 'Hi there, how can I help you today?', sender: 'ai' }]);
	let userInput = $state('');
	let messagesContainer: HTMLDivElement = $state(null); // Reference to messages div
	// Track current page context
	let currentPage = $state('home');

	// Toggle chat window
	const toggleChat = () => {
		isOpen = !isOpen;
	};

	let isTyping = $state(false);

	// Mock user data (replace with actual user data logic)
	const user = {
		name: 'Guest',
		isAuthenticated: false
	};

	// Handle sending messages
	const sendMessage = async () => {
		if (userInput.trim() === '') return;

		let tempUserInput = userInput;
		userInput = '';
		// Add user message
		messages = [...messages, { text: tempUserInput, sender: 'user' }];

		isTyping = true;

		tempUserInput += `\nContext: {instruction: "You are an assistant for this user on our app",currency: "ZAR",page: ${page.url.pathname}, userItinerary: ${JSON.stringify(itinerary.get())}`;
		const req = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ prompt: tempUserInput }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = await req.json();

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
		messages = [...messages, { text: res.response, sender: 'ai' }];
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
						class={`mb-3 w-fit max-w-[80%] rounded-lg p-2 text-sm sm:text-base ${
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
