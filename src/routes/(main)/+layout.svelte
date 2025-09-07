<script lang="ts">
	import Navbar from '$lib/ui/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<div class=" pt-20">
	{@render children?.()}
</div>
