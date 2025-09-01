<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { fade, scale } from 'svelte/transition';
	import { ArrowRightAltSolid } from 'flowbite-svelte-icons';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
</script>

<!-- Hero Section -->
<section transition:scale class="bg-background bg-primary-100 py-20">
	<div class="container mx-auto flex flex-col items-center gap-8 px-4 md:flex-row">
		<div class="text-center md:w-1/2 md:text-left">
			<h1 class="mb-4 text-4xl font-bold text-primary-800 md:text-5xl" in:fade={{ duration: 500 }}>
				Traveling to South Africa?
			</h1>
			<p class="mx-auto mb-6 max-w-lg text-lg text-neutral-700 md:mx-0">
				Discover authentic township and rural experiences in South Africa with our AI-powered
				tourism platform.
			</p>
			<div class="flex justify-center gap-4 md:justify-start">
				<Button
					href="/discover"
					color="alternative"
					size="xl"
					class="bg-primary-400 hover:bg-primary-500"
				>
					Explore Now
				</Button>
				<Button
					href="/signup"
					color="primary"
					size="xl"
					class="bg-primary-500 hover:bg-primary-600"
				>
					Sign Up
				</Button>
			</div>
		</div>
		<div class="md:w-1/2">
			<img
				src="/images/sa-culture.jpg"
				alt="South African township culture"
				class="mx-auto w-full max-w-md rounded-3xl"
			/>
		</div>
	</div>
</section>

<!-- Features -->
<section transition:fade class="bg-neutral-100 py-16">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-semibold text-secondary-700">What We Offer</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<Card class="border border-secondary-200 bg-neutral-50 text-center">
				<ArrowRightAltSolid class="mx-auto mb-4 h-12 w-12 text-primary-500" />
				<h3 class="mb-2 text-xl font-bold text-secondary-600">Virtual Concierge</h3>
				<p class="text-neutral-600">
					Personalized itineraries for tourists based on preferences, budget, and length of stay.
				</p>
			</Card>
			<Card class="border border-secondary-200 bg-neutral-50 text-center">
				<ArrowRightAltSolid class="mx-auto mb-4 h-12 w-12 text-primary-500" />
				<h3 class="mb-2 text-xl font-bold text-secondary-600">AI Chatbot for Businesses</h3>
				<p class="text-neutral-600">
					Real-time support for local businesses with answers on improvement, certification, and
					funding.
				</p>
			</Card>
			<Card class="border border-secondary-200 bg-neutral-50 text-center">
				<ArrowRightAltSolid class="mx-auto mb-4 h-12 w-12 text-primary-500" />
				<h3 class="mb-2 text-xl font-bold text-secondary-600">AI-Powered Data Insights</h3>
				<p class="text-neutral-600">
					Real-time analytics for the tourism sector to drive inclusive policies and targeted
					interventions.
				</p>
			</Card>
		</div>
		<div class="mt-8 text-center">
			<Button href="/features" color="primary" class="bg-primary-500 hover:bg-primary-600">
				Learn More
			</Button>
		</div>
	</div>
</section>

<!-- Community Impact -->
<section class="bg-background py-16">
	<div class="container mx-auto px-4 text-center">
		<h2 class="mb-6 text-3xl font-semibold text-secondary-700">Empowering Communities</h2>
		<p class="mx-auto mb-8 max-w-3xl text-lg text-neutral-700">
			Kasi Khaya creates opportunities for local youth through jobs as data collectors, content
			creators, and trained tour ambassadors, fostering sustainable tourism and economic growth.
		</p>
		<Button href="/impact" color="primary" size="lg" class="bg-primary-500 hover:bg-primary-600">
			See Our Impact
		</Button>
	</div>
</section>

<!-- Footer -->
<footer class="bg-secondary-700 py-12 text-neutral-100">
	<div class="container mx-auto px-4 text-center">
		<h3 class="mb-4 text-2xl font-semibold">Join the Kasi Khaya Journey</h3>
		<p class="mb-6 text-neutral-200">
			Connect with authentic South African experiences and support local communities.
		</p>
		<Button
			href="/signup"
			color="alternative"
			size="xl"
			class="bg-primary-400 hover:bg-primary-500"
		>
			Get Started
		</Button>
	</div>
</footer>
