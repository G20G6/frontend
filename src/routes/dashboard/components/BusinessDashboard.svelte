<script>
	import ExperienceItem from '$lib/ui/components/ExperienceItem.svelte';
</script>

<div>
	<h2 class="mb-4 text-2xl font-semibold">Recently Edited</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each Array(6) as _, index}
			<ExperienceItem
				experience={{
					title: `Experience ${index + 1}`,
					date: new Date(),
					price: (index + 1) * 100
				}}
			/>
		{/each}
	</div>
</div>
