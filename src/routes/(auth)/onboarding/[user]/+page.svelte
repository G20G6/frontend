<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const user_type = page.params.user;

	//the validation is handled in the server, so no need for extra checks here

	const nextPage = '/' + user_type;

	const onsubmit = (e: any) => {
		e.preventDefault();
		console.log('Form submitted');
		goto('/onboarding');
	};

	const users = $state({
		tourist: {
			language: '',
			interests: ''
		},
		business: {
			company_name: '',
			company_type: '',
			company_description: '',
			province: '',
			suburb: ''
		},
		youth: {
			interests: '',
			province: '',
			suburb: ''
		}
	});
	const user = users[user_type];
	const userInputs = Object.keys(user);
	console.log(userInputs);

	/**
	 * TOURIST: (language, interests)
	 * BUSINESS: (company name, company type, company description, company location, )
	 * YOUTH: (interest, province, suburb, )
	 */
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
			{#each userInputs as input}
				<div>
					<Label for="fullname">{input}</Label>
					<Input type="text" id={input} placeholder="Enter your {input}" required />
				</div>
			{/each}

			<Button type="submit" class="w-full">Sign Up</Button>
		</form>
		<p
			class="dark:text-gray -400 mt-4 text-center text-sm
text-gray-600"
		>
			Already have an account?
			<a href="/login" class="text-primary-500 hover:underline">Log in</a>
		</p>
	</div>
</div>
