<script lang="ts">
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';
	import TempLogo from '../tempLogo.svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About Us', href: '/about' },
		{ name: 'Discover', href: '/discover' },
		{ name: 'Contact Us', href: '/contact' }
	];
</script>

<Navbar
	class="bg-background fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between lg:p-0"
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

	<Button href="/signup">Sign up</Button>
</Navbar>
