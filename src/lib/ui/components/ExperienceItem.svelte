<script>
	import { Button } from 'flowbite-svelte';
	import { itinerary } from '../../../routes/discover/controller.svelte';
	import { Heart } from '@lucide/svelte';
	import moment from 'moment';

	let { experience, index } = $props();
</script>

<div class="h-[430px] rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
	<img
		src={experience.image}
		alt={experience.title}
		class="mb-3 h-32 w-full rounded-md object-cover sm:h-40"
	/>

	<div class="flex h-2/5 flex-col justify-between">
		<p class="text-sm font-medium text-neutral-800 sm:text-base">
			{experience.title} in {experience.province}
		</p>
		<p class="text-xs text-neutral-600 sm:text-sm">{experience.theme}</p>
		<p class="text-xs text-neutral-500 sm:text-sm">
			{moment(experience.date).format('LL')} · {experience.time}
		</p>
		<p class="line-clamp-2 text-xs text-neutral-600 sm:text-sm">{experience.description}</p>
		<h3 class="mt-1 text-lg font-semibold text-primary-600">R {experience.price}</h3>
	</div>

	<div class="mt-3 flex w-full items-center">
		{#if itinerary.includes(experience.id)}
			<Button color="red" onclick={() => itinerary.remove(index)} class="text-sm sm:text-base">
				Remove from Itinerary
			</Button>
		{:else}
			<Button onclick={() => itinerary.add(experience)} class="text-sm sm:text-base">
				Add to Itinerary
			</Button>
		{/if}
		<Button color="alternative" class="ml-2 text-sm sm:text-base">
			<Heart />
		</Button>
	</div>
</div>
