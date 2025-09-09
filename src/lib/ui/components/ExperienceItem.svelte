<script>
	import { Button } from 'flowbite-svelte';
	import { itinerary } from '../../../routes/discover/controller.svelte';
	import { Heart } from '@lucide/svelte';
	import moment from 'moment';

	let { experience } = $props();
</script>

<div class="h-[400px] border border-neutral-200 bg-white p-3">
	<img
		src="https://placehold.co/600x400@3x.png"
		alt={experience.title}
		class="mb-2 h-32 w-full object-cover sm:h-40"
	/>

	<div class="flex h-2/5 flex-col justify-between">
		<p class=" text-sm text-neutral-600 sm:text-base">{experience.title}</p>
		<p class=" text-xs text-neutral-600 sm:text-base">{moment(experience.date).format('LL')}</p>
		<h3 class="text-lg font-semibold">R {experience.price}</h3>
	</div>

	<div class="flex w-full items-center">
		<Button onclick={() => itinerary.add(experience)} class="text-sm sm:text-base">
			Add to Itinerary
		</Button>
		<Button color="alternative" class="ml-2 text-sm sm:text-base">
			<Heart />
		</Button>
	</div>
</div>
