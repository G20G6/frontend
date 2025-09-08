<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';
	import { dashboardState, getDashboardUser } from './data/controller.svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';
	let { children } = $props();

	let isDashboard = $state(false);
	let isLoggedIn = $state(true);
	let activeUrl = $state(page.url.pathname);

	const user = getDashboardUser(dashboardState.user_type);

	const sidebar = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = sidebar.close;

	$effect(() => {
		isDemoOpen = sidebar.isOpen;
		activeUrl = page.url.pathname;
	});
	const activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<!--DASHBOARD NAVBAR-->
<Navbar class="bg-background right-0 left-0 z-50 flex w-full items-center justify-between py-3">
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

	<Button color="red" href="/signup">Logout</Button>
</Navbar>

<!-- DASHBOARD MAIN SECTION -->
<div class="relative h-[87svh]">
	<!-- DASHBOARD SIDEBAR -->
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
			{#each user.sidebarItems as item}
				<SidebarItem label={item.name} href={item.href}>
					{#snippet icon()}
						<ChartOutline
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-primary-500"
						/>
					{/snippet}
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</Sidebar>
	<div class="h-96 overflow-auto px-4 md:ml-64">
		<!-- DASHBOARD CONTENT/PAGES -->
		<div class="flex">
			{@render children?.()}
		</div>
	</div>
</div>
