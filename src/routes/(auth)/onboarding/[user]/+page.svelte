<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button, Input, Label, Select } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';
	import { getOnboardingUser } from '../controller.svelte';

	const user_type = page.params.user || '';

	//the validation is handled in the server, so no need for extra checks here

	const nextPage = '/' + user_type;

	const onsubmit = (e: any) => {
		e.preventDefault();
		goto('/dashboard');
	};

	let user = $state(getOnboardingUser(user_type));
	/**
	 * TOURIST: (language, interests)
	 * BUSINESS: (company name, company type, company description, company location, )
	 * YOUTH: (interest, province, suburb, )
	 */

	afterNavigate(({ from, to }) => {
		const career = to?.url.searchParams.get('career');
		if (career) {
			user.inputs = user.inputs.map((input) => {
				if (input.name === 'Program') {
					input.options = input.options.map((option) => {
						if (option.id === career) {
							return { ...option, value: option.value }; // Ensure value is set
						}
						return option;
					});
					// Optionally set the input value to the selected option's value
					const selectedOption = input.options.find((option) => option.id === career);
					if (selectedOption) {
						input.value = selectedOption.value;
					}
				}
				return input;
			});
		}
	});
</script>

<div
	transition:scale={{ duration: 400 }}
	class="flex w-full items-center justify-center bg-white lg:min-h-screen"
>
	<div class="w-full max-w-md rounded-lg bg-white p-8">
		<h2 class="mb-6 text-center text-2xl font-bold">
			{user_type?.charAt(0).toUpperCase() + user_type?.slice(1)} Onboarding
		</h2>
		<form class="space-y-6" {onsubmit}>
			{#each user.inputs as input}
				<div>
					<Label for={input.name}>{input.name}</Label>
					<!-- 
					inputs: [
				{ name: 'language', value: '', type: 'text' },
				{ name: 'interests', value: '', type: 'multi-select' }
			]
					 -->
					{#if input.type === 'text'}
						<Input
							type="text"
							id={input.name}
							bind:value={input.value}
							placeholder="Enter your {input.name}"
							required
						/>
					{:else if input.type === 'select'}
						<Select
							id={input.name}
							items={input.options}
							placeholder="Select {input.name}"
							bind:value={input.value}
							required
						></Select>
					{:else if input.type === 'multi-select'}
						<!-- A group of buttons -->
						<Select
							items={input.options}
							id={input.name}
							placeholder="Select your {input.name}"
							bind:value={input.value}
							required
						></Select>
					{/if}
				</div>
			{/each}

			<Button type="submit" class="w-full">Submit</Button>
		</form>
	</div>
</div>
