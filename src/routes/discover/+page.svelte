<script lang="ts">
	import { Button, Navbar, Modal, NavBrand, Search } from 'flowbite-svelte';
	import { List, MapPin, Plus, SearchIcon, Trash2 } from '@lucide/svelte';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { page } from '$app/state';
	import AiChat from '$lib/ui/components/AIChat.svelte';
	import { experiences } from './model';
	import { itinerary } from './controller.svelte';
	import ExperienceItem from '$lib/ui/components/ExperienceItem.svelte';
	import { afterNavigate } from '$app/navigation';
	import Seo from '$lib/ui/SEO.svelte';
	import { scale } from 'svelte/transition';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { generateItineraryPDF } from '$lib';

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

	// Reactive itinerary items

	// Search term for filtering experiences
	let searchTerm = $state('');

	let activeUrl = $state(page.url.pathname);

	const sidebar = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = sidebar.close;
	$effect(() => {
		isDemoOpen = sidebar.isOpen;
		activeUrl = page.url.searchParams.get('search') || page.url.pathname;
	});
	const activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-primary-100 ';

	// Filter experiences based on search term
	const filteredExperiences = (category: string) => {
		return experiences.filter(
			(exp) =>
				exp.category === category &&
				(searchTerm === '' ||
					exp.title.toLowerCase().includes(searchTerm.toLowerCase().replace(' ', '-')) ||
					exp.province.toLowerCase().includes(searchTerm.toLowerCase().replace(' ', '-')) ||
					exp.province
						.toLowerCase()
						.replace(' ', '-')
						.includes(searchTerm.toLowerCase().replace(' ', '-')))
		);
	};
	// Add item from form
	const handleFormSubmit = (e: Event) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const destination = (form.elements.namedItem('destination') as HTMLInputElement).value;
		const activity = (form.elements.namedItem('activity') as HTMLInputElement).value;
		if (destination && activity) {
			itinerary.data = [...itinerary.data, { title: activity, province: destination }];
			form.reset();
		}
	};

	const toggleIterinary = () => {
		itinerary.isOpen = !itinerary.isOpen;
	};

	afterNavigate(({ from, to }) => {
		searchTerm = to?.url.searchParams.get('search') || '';
	});

	onMount(() => {
		itinerary.get();
	});
</script>

<Seo
	title="Discover"
	desc="Discover Kasi Khaya"
	langs={['en-ZA', 'en-US']}
	keywords="kasi khaya, tourism, discover places,experiences, food, drinks,
history, culture, sustainability"
/>

<div class="fixed bottom-4 z-50 flex w-full items-center justify-center">
	<div
		transition:scale
		class="flex w-fit items-center justify-center gap-4 rounded-full border bg-white p-5 shadow-2xl"
	>
		<AiChat />
		<!-- ITERINARY -->
		{#if !itinerary.isOpen}
			<Button onclick={toggleIterinary} class="space-x-5">
				<List /> Itinerary({itinerary.size()})
			</Button>
		{/if}
	</div>
</div>

<Navbar class=" right-0 left-0 z-50 flex w-full items-center justify-between py-3">
	<div class="flex items-center">
		<SidebarButton onclick={sidebar.toggle} class="mb-2" />

		<NavBrand href="/">
			<img src="/images/logo-icon.jpg" class="aspect-square h-8 rounded-full sm:h-10" alt="icon" />
			<img src="/images/logo-raw.png" class="h-8 sm:h-10" alt="logo" />
			<span class="hidden self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>KasiKhaya</span
			>
		</NavBrand>
	</div>

	<Button href="/dashboard">Dashboard</Button>
</Navbar>

<div class="relative h-[87svh]">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		classes={{ nonactive: nonActiveClass, active: activeClass }}
		position="absolute"
		class="top-0 z-40 h-full w-[75vw] bg-white sm:w-64"
	>
		<SidebarGroup>
			<h3 class="p-2 text-lg font-bold sm:p-3">Provinces</h3>
			{#each provinces.sort() as province}
				<SidebarItem
					label={province}
					color="primary"
					class="bg-white"
					href="?search={province.toLowerCase().replace(' ', '-')}"
				>
					{#snippet icon()}
						<MapPin />
					{/snippet}
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</Sidebar>
	<div class="h-full overflow-auto px-2 sm:px-4 md:ml-64">
		<div class="flex items-center gap-2 sm:gap-4"></div>
		<main class="w-full flex-1 space-y-6 p-4 sm:p-6">
			<h1 class="text-2xl font-bold text-neutral-800 sm:text-3xl">Discover Kasi Khaya</h1>

			<Search
				bind:value={searchTerm}
				placeholder="Search places, experiences, and more"
				class="w-full sm:max-w-md"
			>
				<Button color="alternative" class="border-none p-2">
					<SearchIcon size={18} />
				</Button>
			</Search>

			<!-- Sustainability Section -->
			{#if filteredExperiences('Sustainability').length > 0}
				<section class="mb-8">
					<h2 class="mb-4 text-xl font-semibold text-neutral-800 sm:text-2xl">
						Featured experiences
					</h2>
					<p class="mb-4 text-sm text-neutral-600">
						Discover sustainable alternatives to make your journey more mindful, meaningful, and
						impactful — and embark on a travel experience that inspires a better future.
					</p>
					<div class="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
						{#each filteredExperiences('Sustainability') as exp}
							<ExperienceItem experience={exp} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- When no experiences are found -->
			{#if experiences.length === 0}
				<p class="text-sm text-neutral-600">No experiences & places found.</p>
			{/if}

			{#if filteredExperiences('Food & Drinks').length > 0}
				<!-- Food & Drinks Section -->
				<section class="mb-8">
					<h2 class="mb-4 text-xl font-semibold text-neutral-800 sm:text-2xl">Food & Drinks</h2>
					<p class="mb-4 text-sm text-neutral-600">
						Discover upcoming cultural and artistic events across South Africa, from dance shows and
						festivals to local markets. Find your next experience here!
					</p>
					<div class="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
						{#each filteredExperiences('Food & Drinks') as exp}
							<ExperienceItem experience={exp} />
						{/each}
					</div>
				</section>
			{/if}

			{#if filteredExperiences('History & Culture').length > 0}
				<!-- History & Culture Section -->
				<section class="mb-8">
					<h2 class="mb-4 text-xl font-semibold text-neutral-800 sm:text-2xl">History & Culture</h2>
					<p class="mb-4 text-sm text-neutral-600">
						Discover upcoming cultural and artistic events across South Africa, from dance shows and
						festivals to local markets. Find your next experience here!
					</p>
					<div class="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
						{#each filteredExperiences('History & Culture') as exp}
							<ExperienceItem experience={exp} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- Itinerary Modal -->
			<Modal title="Your itinerary" form bind:open={itinerary.isOpen}>
				<!-- Itinerary Modal -->
				<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
					<div
						class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
					>
						<!-- Header -->
						<div class="relative bg-[#99450f] p-4 text-white">
							<h2 class="text-xl font-bold">Your Itinerary</h2>
							<div class="absolute top-0 right-0 flex h-full items-center pr-4">
								<button class="text-white hover:text-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						<!-- Content -->
						<div class="flex-1 overflow-y-auto p-4">
							{#if itinerary.size() === 0}
								<div class="rounded-lg bg-[#f5f5f5] p-6 text-center">
									<p class="text-sm text-[#4d4d4d]">No items in your itinerary yet.</p>
								</div>
							{:else}
								<div class="mb-4 flex items-center justify-between">
									<p class="font-semibold text-[#4d4d4d]">Total Days: {itinerary.totalDays()}</p>
								</div>

								<div class="space-y-4">
									{#each itinerary.get() as item, index}
										<div class="overflow-hidden rounded-lg border border-[#e0e0e0] bg-[#f5f5f5]">
											<!-- Day Header -->
											<div class="flex items-center justify-between bg-[#ff9933] p-3 text-white">
												<div class="flex items-center">
													<span class="mr-3 text-lg font-bold">Day {index + 1}</span>
													<span class="text-sm">{item.theme}</span>
												</div>
												<button class="text-white hover:text-[#99450f]">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>

											<!-- Content -->
											<div class="p-4">
												<!-- Location and Date -->
												<div class="mb-3 text-xs text-[#4d4d4d]">
													{item.province} — {moment(item.date).format('LL')}
												</div>

												<!-- Event Details -->
												<div class="mb-4 grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
													<div>
														<p class="font-semibold text-[#665d4a]">Date & Time</p>
														<p class="text-[#4d4d4d]">
															{moment(item.date).format('MMMM D, YYYY')} at {item.time || 'TBD'}
														</p>
													</div>
													<div>
														<p class="font-semibold text-[#665d4a]">Location</p>
														<p class="text-[#4d4d4d]">
															{item.location || 'TBD'}, {item.province || 'South Africa'}
														</p>
													</div>
													<div>
														<p class="font-semibold text-[#665d4a]">Provider</p>
														<p class="text-[#4d4d4d]">{item.provider || 'Local Guide'}</p>
													</div>
													<div>
														<p class="font-semibold text-[#665d4a]">Duration</p>
														<p class="text-[#4d4d4d]">{item.durationHours || 'Full'} hours</p>
													</div>
												</div>

												<!-- Activities -->
												{#if item.activities && item.activities.length > 0}
													<div class="mb-4">
														<p class="mb-2 text-sm font-semibold text-[#99450f]">Schedule:</p>
														<div class="space-y-2">
															{#each item.activities as act}
																<div class="border-l-2 border-[#665d4a] py-1 pl-2">
																	<p class="text-sm font-semibold">{act.time} — {act.activity}</p>
																	{#if act.description}
																		<p class="text-xs text-[#4d4d4d]">{act.description}</p>
																	{/if}
																	{#if act.estimatedCost}
																		<p class="text-xs text-[#4d4d4d]">
																			Est. Cost: R {act.estimatedCost}
																		</p>
																	{/if}
																</div>
															{/each}
														</div>
													</div>
												{/if}

												<!-- Price -->
												<div
													class="flex items-center justify-between border-t border-[#e0e0e0] pt-3"
												>
													<p class="font-bold text-[#99450f]">Experience Price:</p>
													<p class="font-bold text-[#99450f]">R {item.price}</p>
												</div>
											</div>
										</div>
									{/each}
								</div>

								<!-- Total -->
								<div class="mt-6 border-t border-[#ff9933] pt-4">
									<div class="flex items-center justify-between">
										<p class="text-lg font-bold text-[#99450f]">Total:</p>
										<p class="text-lg font-bold text-[#99450f]">R {itinerary.totalAmount()}</p>
									</div>
								</div>
							{/if}
						</div>

						<!-- Footer -->
						<div class="border-t border-[#e0e0e0] bg-[#f5f5f5] p-4">
							<div class="flex flex-col gap-3 sm:flex-row">
								<button
									onclick={() => generateItineraryPDF(itinerary)}
									class="flex flex-1 items-center justify-center rounded bg-[#ff9933] px-4 py-2 font-medium text-white hover:bg-[#99450f]"
								>
									Print Itinerary
								</button>
								<div class="flex flex-1 flex-col gap-2 sm:flex-row">
									<a
										href="/booking"
										class="flex-1 rounded bg-[#665d4a] px-4 py-2 font-medium text-white hover:bg-[#4d4d4d]"
									>
										Book Now
									</a>
									<button
										class="flex-1 rounded border border-[#e0e0e0] px-4 py-2 font-medium text-[#4d4d4d] hover:bg-gray-100"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</main>
	</div>
</div>
