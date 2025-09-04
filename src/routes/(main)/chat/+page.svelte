<script lang="ts">
	import { Button, Listgroup, ListPlaceholder, Search } from 'flowbite-svelte';
	import { MicrophoneOutline } from 'flowbite-svelte-icons';
	import { fade, scale } from 'svelte/transition';

	// Search and filter state
	let searchTerm = $state('');
	const pageState = $state({
		isLoading: false
	});

	const onsubmit = (e: any) => {
		e.preventDefault();
		searchTerm = '';
		console.log('Form submitted');
		pageState.isLoading = true;
	};

	const examplePrompts = [
		'What are the best places to visit in Cape Town?',
		'I have a budget of R900, I enjoy cultural tours. What are the best places to visit?',
		'I am a student and want to explore the local dining scene. What are the best places to visit?',
		'What are the best places to visit in Pretoria?'
	];
</script>

{#if !pageState.isLoading}
	<section transition:scale class="bg-background bg-primary-100 py-16">
		<div class="container mx-auto px-4 text-center">
			<h1 class="mb-4 text-4xl font-bold text-primary-800 md:text-5xl" in:fade={{ duration: 500 }}>
				Let's help you get immersed
			</h1>
			<p class="mx-auto mb-6 max-w-2xl text-lg text-neutral-700">
				Discover authentic township and rural experiences with Khaya AI.
			</p>
			<div class="mx-auto flex max-w-3xl flex-col justify-center gap-4">
				<form {onsubmit} class="relative flex-1">
					<Search bind:value={searchTerm} placeholder="What would you like to do?">
						<Button type="button" class="m-2 border-none" color="alternative">
							<MicrophoneOutline />
						</Button>
					</Search>
				</form>
				<Listgroup active items={examplePrompts} onclick={(item) => (searchTerm = String(item?.detail))} />
			</div>
		</div>
	</section>
{:else}
	<section transition:scale class="bg-background bg-primary-100 py-16">
		<div class="container mx-auto px-4 text-center">
			<ListPlaceholder rounded="md" />
			<!-- <VirtualConcierge /> -->
		</div>
	</section>
{/if}
