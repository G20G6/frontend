<script lang="ts">
	import { Button, Navbar, Modal, NavBrand } from 'flowbite-svelte';
	import { Calendar, Clock, MapPin, User, CreditCard } from '@lucide/svelte';
	import { page } from '$app/state';
	import Seo from '$lib/ui/SEO.svelte';
	import moment from 'moment';
	import { itinerary } from '../../discover/controller.svelte';
	import { afterNavigate, goto } from '$app/navigation';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		cardNumber: '',
		cardExpiry: '',
		cardCVC: '',
		cardName: '',
		termsAgreed: false
	});

	// Handle form submission
	const handleSubmit = (e: Event) => {
		e.preventDefault();
		// Process booking logic here
		console.log('Booking submitted:', formData);
		// You would typically send this to your backend
	};

	afterNavigate(() => {
		if (itinerary.size() === 0) {
			goto('/discover');
		}
	});
</script>

<Seo
	title="Book Your Experience"
	desc="Book your Kasi Khaya experience"
	langs={['en-ZA', 'en-US']}
	keywords="kasi khaya, booking, tourism, south africa"
/>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold text-primary-800">Complete Your Booking</h1>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Booking Summary -->
		<div class="rounded-lg border bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-semibold text-primary-800">Your Itinerary</h2>

			{#if itinerary.size() === 0}
				<p class="text-neutral-600">No items in your itinerary yet.</p>
			{:else}
				<div class="mb-6">
					<div class="mb-2 flex justify-between">
						<span class="font-medium">Total Days:</span>
						<span>{itinerary.totalDays()}</span>
					</div>
					<div class="mb-2 flex justify-between">
						<span class="font-medium">Total Experiences:</span>
						<span>{itinerary.size()}</span>
					</div>
					<div class="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
						<span>Total Amount:</span>
						<span>R {itinerary.totalAmount()}</span>
					</div>
				</div>

				<div class="max-h-96 space-y-4 overflow-y-auto">
					{#each itinerary.get() as item, index}
						<div class="rounded-lg border p-4">
							<div class="flex items-start justify-between">
								<div>
									<h3 class="font-semibold">Day {index + 1}: {item?.title}</h3>
									<p class="text-sm text-neutral-600">{item?.theme}</p>
								</div>
								<span class="font-semibold">R {item?.price}</span>
							</div>
							<div class="mt-2 text-sm text-neutral-600">
								<div class="flex items-center">
									<Calendar size={14} class="mr-2" />
									<span>{moment(item?.date).format('MMMM D, YYYY')} at {item.time}</span>
								</div>
								<div class="flex items-center">
									<MapPin size={14} class="mr-2" />
									<span>{item?.location}, {item?.province}</span>
								</div>
								<div class="flex items-center">
									<Clock size={14} class="mr-2" />
									<span>{item?.durationHours} hours</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Booking Form -->
		<div class="rounded-lg border bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-semibold text-primary-800">Your Information</h2>

			<form onsubmit={handleSubmit}>
				<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label for="name" class="mb-1 block text-sm font-medium text-neutral-700"
							>Full Name</label
						>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-neutral-700"
							>Email Address</label
						>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="phone" class="mb-1 block text-sm font-medium text-neutral-700"
							>Phone Number</label
						>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="address" class="mb-1 block text-sm font-medium text-neutral-700"
							>Address</label
						>
						<input
							type="text"
							id="address"
							bind:value={formData.address}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="city" class="mb-1 block text-sm font-medium text-neutral-700">City</label>
						<input
							type="text"
							id="city"
							bind:value={formData.city}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="postalCode" class="mb-1 block text-sm font-medium text-neutral-700"
							>Postal Code</label
						>
						<input
							type="text"
							id="postalCode"
							bind:value={formData.postalCode}
							required
							class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
					</div>
				</div>

				<div class="mb-6 border-t pt-6">
					<h3 class="mb-4 flex items-center text-lg font-semibold text-primary-800">
						<CreditCard class="mr-2" size={20} />
						Payment Information
					</h3>

					<div class="space-y-4">
						<div>
							<label for="cardName" class="mb-1 block text-sm font-medium text-neutral-700"
								>Name on Card</label
							>
							<input
								type="text"
								id="cardName"
								bind:value={formData.cardName}
								required
								class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
							/>
						</div>
						<div>
							<label for="cardNumber" class="mb-1 block text-sm font-medium text-neutral-700"
								>Card Number</label
							>
							<input
								type="text"
								id="cardNumber"
								bind:value={formData.cardNumber}
								required
								placeholder="1234 5678 9012 3456"
								class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
							/>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="cardExpiry" class="mb-1 block text-sm font-medium text-neutral-700"
									>Expiry Date</label
								>
								<input
									type="text"
									id="cardExpiry"
									bind:value={formData.cardExpiry}
									required
									placeholder="MM/YY"
									class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
								/>
							</div>
							<div>
								<label for="cardCVC" class="mb-1 block text-sm font-medium text-neutral-700"
									>CVC</label
								>
								<input
									type="text"
									id="cardCVC"
									bind:value={formData.cardCVC}
									required
									placeholder="123"
									class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="mb-6">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={formData.termsAgreed}
							required
							class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-sm text-neutral-700">
							I agree to the <a href="/terms" class="text-primary-600 hover:underline"
								>Terms and Conditions</a
							>
							and
							<a href="/privacy" class="text-primary-600 hover:underline">Privacy Policy</a>
						</span>
					</label>
				</div>

				<div class="flex items-center justify-between">
					<div class="text-lg font-semibold">
						Total: R {itinerary.totalAmount()}
					</div>
					<Button type="submit" disabled={itinerary.size() === 0 || !formData.termsAgreed}>
						Complete Booking
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	input:focus {
		border-color: #ff9933;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.grid-cols-2 {
			grid-template-columns: 1fr;
		}
	}
</style>
