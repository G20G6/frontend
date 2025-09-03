<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';
	import { dashboardState, getDashboardUser } from './data/controller.svelte';
	let { children } = $props();

	let activeUrl = $state(page.url.pathname);

	const user = getDashboardUser(dashboardState.user_type);

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

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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
		<div class="flex">
			{@render children?.()}
		</div>
	</div>
</div>
