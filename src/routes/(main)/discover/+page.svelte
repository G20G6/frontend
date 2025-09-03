<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { MapPin, Plus } from '@lucide/svelte';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';

	// Static provinces (South African context)
	const provinces = [
		'Western Cape',
		'Eastern Cape',
		'Gauteng',
		'KwaZulu-Natal',
		'Limpopo',
		'Mpumalanga',
		'North West',
		'Northern Cape',
		'Free State'
	];

	// Static itinerary items
	const itinerary = [];

	let activeUrl = $state(page.url.pathname);

	const sidebar = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = sidebar.close;
	$effect(() => {
		isDemoOpen = sidebar.isOpen;
		activeUrl = page.url.pathname;
	});
	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
	const activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
</script>

<SidebarButton onclick={sidebar.toggle} class="mb-2" />
<div class="relative h-[87svh]">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		classes={{ nonactive: nonActiveClass, active: activeClass }}
		position="absolute"
		class="z-40 h-full"
	>
		<SidebarGroup>
			{#each provinces as province}
				<SidebarItem label={province} href="#{province.toLowerCase().replace(' ', '-')}">
					{#snippet icon()}
						<ChartOutline
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-primary-500"
						/>
					{/snippet}
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</Sidebar>
	<div class="h-full overflow-auto px-4 md:ml-64">
		<main class="flex-1 p-6">
			<h1 class="mb-6 text-3xl font-bold text-neutral-800">Discover Kasi Khaya</h1>

			<!-- Sustainability Section -->
			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-neutral-800">Sustainability</h2>
				<p class="mb-4 text-neutral-600">
					Discover sustainable alternatives to make your journey more mindful, meaningful, and
					impactful — and embark on a travel experience that inspires a better future.
				</p>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Sustainable Travel"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Eco-Friendly Tours in Western Cape</p>
					</div>
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Sustainable Travel"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Green Accommodations in Eastern Cape</p>
					</div>
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Sustainable Travel"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Community Projects in Limpopo</p>
					</div>
				</div>
			</section>

			<!-- What's On Section -->
			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold text-neutral-800">What's On</h2>
				<p class="mb-4 text-neutral-600">
					Discover upcoming cultural and artistic events across South Africa, from dance shows and
					festivals to local markets. Find your next experience here!
				</p>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Cultural Event"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Langa Cultural Festival</p>
					</div>
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Cultural Event"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Khayelitsha Dance Show</p>
					</div>
					<div class="border border-neutral-200 bg-white p-4">
						<img
							src="https://placehold.co/600x400@3x.png"
							alt="Cultural Event"
							class="mb-2 h-40 w-full object-cover"
						/>
						<p class="text-neutral-600">Gauteng Art Market</p>
					</div>
				</div>
			</section>

			<!-- Itinerary Creation -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold text-neutral-800">Create Your Itinerary</h2>
				<form class="space-y-4">
					<div>
						<label class="block text-neutral-700">Destination</label>
						<input
							type="text"
							placeholder="e.g., Cape Town"
							class="w-full rounded border border-neutral-300 p-2"
						/>
					</div>
					<div>
						<label class="block text-neutral-700">Activity</label>
						<input
							type="text"
							placeholder="e.g., Cultural Tour"
							class="w-full rounded border border-neutral-300 p-2"
						/>
					</div>
					<Button color="primary" class="flex items-center bg-primary-500 hover:bg-primary-600">
						<Plus class="mr-2 h-5 w-5" /> Add to Itinerary
					</Button>
				</form>
			</section>
		</main>
	</div>
</div>
