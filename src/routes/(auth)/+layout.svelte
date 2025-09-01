<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import modeobserver from '$lib/utils/modeobserver';
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import TempLogo from '$lib/ui/TempLogo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar class="bg-background z-50 flex w-full items-center justify-between lg:hidden">
	<div class="flex items-center">
		<NavBrand href="/">
			<TempLogo />

			<span class="hidden self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>KasiKhaya</span
			>
		</NavBrand>
	</div>
</Navbar>

<div class="flex">
	<img
		src="/images/illustration.jpg"
		alt="Illustration"
		class="hidden h-screen w-1/2 object-cover lg:block"
	/>
	{@render children?.()}
</div>
