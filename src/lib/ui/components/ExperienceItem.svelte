<script>
	import { Button } from 'flowbite-svelte';
	import { addToItinerary } from '../../../routes/discover/controller.svelte';
	import { Heart } from '@lucide/svelte';

	let { experience } = $props();
</script>

<div class="h-[400px] border border-neutral-200 bg-white p-3">
	<img
		src="https://placehold.co/600x400@3x.png"
		alt="Sustainable Travel"
		class="mb-2 h-32 w-full object-cover sm:h-40"
	/>
	<p class="h-2/5 text-sm text-neutral-600 sm:text-base">{experience.title}</p>
	<div class="flex w-full items-center p-2">
		<Button
			onclick={() => addToItinerary(experience.title, experience.province)}
			class="text-sm sm:text-base"
		>
			Add to Itinerary
		</Button>
		<Button color="alternative" class="ml-2 text-sm sm:text-base">
			<Heart />
		</Button>
	</div>
</div>
