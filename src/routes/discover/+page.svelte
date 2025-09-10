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

	let isIterinaryOpen = $state(false);

	const toggleIterinary = () => {
		isIterinaryOpen = !isIterinaryOpen;
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
		{#if !isIterinaryOpen}
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
			<Modal title="Your itinerary" form bind:open={isIterinaryOpen}>
				{#if itinerary.size() === 0}
					<p class="text-sm text-neutral-600">No items in your itinerary yet.</p>
				{:else}
					<p>Total Days: {itinerary.totalDays()}</p>
					<div class="space-y-2">
						{#each itinerary.get() as item, index}
							<div
								class="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 sm:p-4"
							>
								<span class="flex items-center gap-5">
									<p class="text-lg font-semibold">{index + 1}</p>
									<div>
										<p class="text-sm text-neutral-600">
											{item.title} in {item.province}
										</p>
										<div class="text-xs text-neutral-600">
											{moment(item.date).format('LL')}
										</div>
									</div>
								</span>
								<Button color="red" class="p-2" onclick={() => itinerary.remove(index)}>
									<Trash2 size={18} />
								</Button>
							</div>
						{/each}
					</div>
				{/if}
				{#if itinerary.size() > 0}
					<h3 class="mt-4 text-lg font-bold text-secondary-600">
						Total: R {itinerary.totalAmount()}
					</h3>
				{/if}
				{#snippet footer()}
					<div class="grid w-full grid-cols-2 gap-2">
						<Button type="submit" href="/booking" disabled={itinerary.size() === 0} class="w-full"
							>Book Now</Button
						>
						<Button type="submit" class="w-full" value="decline" color="alternative">Close</Button>
					</div>
				{/snippet}
			</Modal>
		</main>
	</div>
</div>
