<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Datepicker, Input, Label } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const onsubmit = (e: any) => {
		e.preventDefault();
		console.log('Form submitted');
		goto('/onboarding');
	};
</script>

<div
	transition:scale={{ duration: 400 }}
	class="flex w-full items-center justify-center bg-white lg:min-h-screen"
>
	<div class="w-full max-w-md rounded-lg bg-white p-8">
		<h2 class="mb-6 text-center text-2xl font-bold">Create Your Account</h2>
		<form class="space-y-6" {onsubmit}>
			<div>
				<Label for="fullname">Full name</Label>
				<Input type="text" id="fullname" placeholder="Enter your full name" required />
			</div>
			<div>
				<Label for="age">Date of birth</Label>
				<Datepicker id="age" placeholder="Enter your age" required />
			</div>
			<div>
				<Label for="country">Country</Label>
				<!-- Change to select -->
				<Input type="text" id="country" placeholder="Select your country" required />
			</div>
			<div>
				<Label for="email">Email Address</Label>
				<Input type="email" id="email" placeholder="Enter your email" required />
			</div>
			<div>
				<Label for="password">Password</Label>
				<Input type="password" id="password" placeholder="Create password" required />
			</div>
			<div>
				<Label for="confirm_password">Confirm password</Label>
				<Input type="password" id="confirm_password" placeholder="Confirm password" required />
			</div>
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
