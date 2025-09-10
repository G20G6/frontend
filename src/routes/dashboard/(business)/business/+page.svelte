<script>
	import { PlusCircleIcon } from '@lucide/svelte';
	import { Card, Button, Input, Label, Modal } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';

	let listings = $state([]);
	let stats = $state({
		revenue: 0,
		totalBookings: 0,
		totalListings: 0
	});

	let newListing = $state({
		name: '',
		price: '',
		date: new Date().toISOString().split('T')[0]
	});

	let showModal = $state(false);

	function createListing() {
		if (newListing.name && newListing.price) {
			listings = [...listings, { ...newListing, id: Date.now() }];
			stats.totalListings = listings.length;
			newListing = {
				name: '',
				price: '',
				date: new Date().toISOString().split('T')[0]
			};
			showModal = false;
		}
	}

	function deleteListing(id) {
		listings = listings.filter((listing) => listing.id !== id);
		stats.totalListings = listings.length;
	}
</script>

<div class="container mx-auto p-6">
	<header class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card class="p-3 text-center">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue</h3>
			<p class="text-2xl font-bold text-primary-600">R {stats.revenue}</p>
		</Card>
		<Card class="v text-center">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Total Bookings</h3>
			<p class="text-2xl font-bold text-primary-600">{stats.totalBookings}</p>
		</Card>
		<Card class="p-3 text-center">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Total Listings</h3>
			<p class="text-2xl font-bold text-primary-600">{stats.totalListings}</p>
		</Card>
	</header>

	<section class="mb-8">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Your Listings</h2>
			<Button color="green" onclick={() => (showModal = true)}>
				<PlusCircleIcon class="mr-2 h-5 w-5" />
				Create Listing
			</Button>
		</div>

		<Modal title="Create New Listing" bind:open={showModal} size="sm">
			<form onsubmit={createListing} class="space-y-4">
				<div>
					<Label for="name" class="mb-2">Listing Name</Label>
					<Input id="name" placeholder="Listing Name" bind:value={newListing.name} required />
				</div>
				<div>
					<Label for="price" class="mb-2">Price</Label>
					<Input
						id="price"
						type="number"
						placeholder="Price"
						bind:value={newListing.price}
						required
					/>
				</div>
				<div>
					<Label for="date" class="mb-2">Date</Label>
					<Input id="date" type="date" bind:value={newListing.date} />
				</div>
				<Button type="submit" color="green" class="w-full">Create Listing</Button>
			</form>
		</Modal>

		{#if listings.length === 0}
			<Card class="p-8 text-center">
				<p class="text-gray-500 dark:text-gray-400">No listings yet. Create your first listing!</p>
			</Card>
		{:else}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each listings as listing}
					<Card padding="sm">
						<div class="flex items-start justify-between p-4">
							<div>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{listing.name}</h3>
								<p class="font-medium text-primary-600">R {listing.price}</p>
								<p class="text-sm text-gray-500 dark:text-gray-400">{listing.date}</p>
							</div>
							<Button color="red" size="xs" onclick={() => deleteListing(listing.id)}>
								<TrashBinOutline class="h-4 w-4" />
							</Button>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</section>
</div>
