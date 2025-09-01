<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const onsubmit = (e: any) => {
		e.preventDefault();
		console.log('Form submitted');
		goto('/dashboard');
	};
</script>

<div
	transition:scale={{ delay: 0, duration: 500 }}
	class="flex w-full items-center justify-center bg-white lg:min-h-screen"
>
	<div class="w-full max-w-md rounded-lg bg-white p-8">
		<h2 class="mb-6 text-center text-2xl font-bold">Welcome Back to Kasi Khaya</h2>
		<form class="space-y-6" {onsubmit}>
			<div>
				<Label for="email">Email Address</Label>
				<Input type="email" id="email" placeholder="Enter your email" required />
			</div>
			<div>
				<Label for="password">Password</Label>
				<Input type="password" id="password" placeholder="Enter your password" required />
			</div>
			<Button type="submit" class="w-full">Login</Button>
		</form>
		<p
			class="dark:text-gray -400 mt-4 text-center text-sm
text-gray-600"
		>
			Do not have an account?
			<a href="/signup" class="text-primary-500 hover:underline">Sign Up</a>
		</p>
	</div>
</div>
