<script lang="ts">
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';
	import TempLogo from './TempLogo.svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About Us', href: '/about' },
		{ name: 'Discover', href: '/discover' },
		{ name: 'Contact Us', href: '/contact' }
	];
	let isDashboard = $state(false);
	let isLoggedIn = $state(true);
	$effect(() => (isDashboard = page.url.pathname === '/dashboard'));
</script>

<Navbar
	class="bg-background fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between lg:p-1"
>
	<div class="flex items-center">
		<NavHamburger />
		<NavBrand href="/">
			<TempLogo />

			<span class="hidden self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>KasiKhaya</span
			>
		</NavBrand>
	</div>

	{#if isDashboard}
		<Button color="red" href="/signup">Logout</Button>
	{:else}
		<NavUl
			class="lg:flex lg:items-center "
			transition={scale}
			transitionParams={{ start: 0.8, duration: 200 }}
		>
			{#each links as link}
				<NavLi class={page.url.pathname === link.href ? 'text-primary-500' : ''} href={link.href}
					>{link.name}</NavLi
				>
			{/each}
		</NavUl>

		{#if isLoggedIn}
			<Button href="/dashboard">Dashboard</Button>
		{:else}
			<Button href="/signup">Sign up</Button>
		{/if}
	{/if}
</Navbar>
