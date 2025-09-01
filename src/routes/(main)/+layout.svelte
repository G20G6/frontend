<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import modeobserver from '$lib/utils/modeobserver';
	import Navbar from '$lib/ui/components/navbar.svelte';
	import { button, ThemeProvider } from 'flowbite-svelte';

	let { children } = $props();

	onMount(() => {
		modeobserver();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class=" pt-20">
	{@render children?.()}
</div>
