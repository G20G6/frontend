<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import modeobserver from '$lib/utils/modeobserver';
	import { BProgress } from '@bprogress/core';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Navbar from '$lib/ui/components/navbar.svelte';

	let { children } = $props();

	onMount(() => {
		modeobserver();
	});

	beforeNavigate(() => {
		BProgress.start();
	});
	afterNavigate(() => {
		BProgress.done();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class=" pt-20">
	{@render children?.()}
</div>
