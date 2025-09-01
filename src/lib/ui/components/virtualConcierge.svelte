<script lang="ts">
	import { Button, Card, Input, Select, Label } from 'flowbite-svelte';
	import { MapPin, DollarSign, Trash, Plus } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	// Props: Pre-parsed itinerary from user input
	let itinerary = $state([
		{
			type: 'accommodation' | 'activity',
			name: '',
			location: '',
			price: 0,
			description: ''
		}
	]);

	// State for adding new items
	let newItemType = $state('accommodation');
	let newItemName = $state('');
	let newItemPrice = $state(0);
	let newItemLocation = $state('');
	let newItemDescription = $state('');

	// Local itinerary state
	let localItinerary = $state([...itinerary]);

	// Delete item from itinerary
	function deleteItem(index: number) {
		localItinerary = localItinerary.filter((_, i) => i !== index);
	}

	// Add custom item to itinerary
	function addItem() {
		if (newItemName && newItemPrice > 0 && newItemDescription) {
			const newItem = {
				type: newItemType,
				name: newItemName,
				location: newItemType === 'accommodation' ? newItemLocation : undefined,
				price: newItemPrice,
				description: newItemDescription
			};
			localItinerary = [...localItinerary, newItem];
			newItemName = '';
			newItemPrice = 0;
			newItemLocation = '';
			newItemDescription = '';
		}
	}
</script>

<section class="bg-neutral-100 py-8">
	<div class="container mx-auto px-4">
		<h2 class="mb-8 text-center text-3xl font-semibold text-secondary-700">
			Your Kasi Khaya Itinerary
		</h2>

		<!-- Itinerary List -->
		{#if localItinerary.length === 0}
			<p class="text-center text-neutral-600">
				Your itinerary is empty. Add items below to start planning!
			</p>
		{:else}
			<Card class="mb-8 border border-secondary-200 bg-neutral-50" padding="xl">
				<h3 class="mb-6 text-2xl font-semibold text-secondary-600">Personalized Itinerary</h3>
				<ul class="space-y-4">
					{#each localItinerary as item, index}
						<li
							class="flex items-center justify-between rounded-lg border border-secondary-200 bg-neutral-100 p-4"
							in:fade={{ duration: 300 }}
						>
							<div>
								<h4 class="text-lg font-bold text-secondary-600">{item.name}</h4>
								{#if item.location}
									<p class="flex items-center gap-2 text-neutral-600">
										<MapPin class="h-5 w-5 text-primary-500" />
										{item.location}
									</p>
								{/if}
								<p class="flex items-center gap-2 text-neutral-600">
									<DollarSign class="h-5 w-5 text-primary-500" /> R{item.price}
								</p>
								<p class="text-neutral-600">{item.description}</p>
							</div>
							<Button
								onclick={() => deleteItem(index)}
								color="alternative"
								class="bg-red-500 text-white hover:bg-red-600"
							>
								<Trash class="h-5 w-5" />
							</Button>
						</li>
					{/each}
				</ul>
				<div class="mt-6 text-center">
					<Button
						href="/signup"
						color="primary"
						class="w-full bg-primary-500 hover:bg-primary-600 sm:w-auto"
					>
						Book Your Itinerary
					</Button>
				</div>
			</Card>
		{/if}

		<!-- Add Custom Item -->
		<Card class="border border-secondary-200 bg-neutral-50" padding="xl">
			<h3 class="mb-6 text-2xl font-semibold text-secondary-600">Add to Your Itinerary</h3>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<Label for="newType" class="mb-2 flex items-center gap-2">
						<Plus class="h-5 w-5 text-primary-500" /> Type
					</Label>
					<Select
						id="newType"
						bind:value={newItemType}
						items={[
							{ value: 'accommodation', name: 'Accommodation' },
							{ value: 'activity', name: 'Activity' }
						]}
					/>
				</div>
				<div>
					<Label for="newName" class="mb-2 flex items-center gap-2">
						<Plus class="h-5 w-5 text-primary-500" /> Name
					</Label>
					<Input id="newName" bind:value={newItemName} placeholder="e.g., Langa Guesthouse" />
				</div>
				{#if newItemType === 'accommodation'}
					<div>
						<Label for="newLocation" class="mb-2 flex items-center gap-2">
							<MapPin class="h-5 w-5 text-primary-500" /> Location
						</Label>
						<Input
							id="newLocation"
							bind:value={newItemLocation}
							placeholder="e.g., Cape Town, Langa"
						/>
					</div>
				{/if}
				<div>
					<Label for="newPrice" class="mb-2 flex items-center gap-2">
						<DollarSign class="h-5 w-5 text-primary-500" /> Price (ZAR)
					</Label>
					<Input id="newPrice" type="number" bind:value={newItemPrice} placeholder="e.g., 450" />
				</div>
				<div class="sm:col-span-2">
					<Label for="newDescription" class="mb-2 flex items-center gap-2">
						<Plus class="h-5 w-5 text-primary-500" /> Description
					</Label>
					<Input
						id="newDescription"
						bind:value={newItemDescription}
						placeholder="e.g., Cozy guesthouse with cultural tours"
					/>
				</div>
			</div>
			<Button
				onclick={addItem}
				color="primary"
				class="mt-6 w-full bg-primary-500 hover:bg-primary-600"
			>
				<Plus class="mr-2 h-5 w-5" /> Add Item
			</Button>
		</Card>
	</div>
</section>
