<script lang="ts">
	import { Navbar, NavBrand } from 'flowbite-svelte';

	let { children } = $props();
</script>

<Navbar class="bg-background z-50 flex w-full items-center justify-between lg:hidden">
	<div class="flex items-center">
		<NavBrand href="/">
			<img src="/images/logo-icon.jpg" class="aspect-square h-8 rounded-full sm:h-10" alt="icon" />
			<img src="/images/logo-raw.png" class="h-8 sm:h-10" alt="logo" />

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
