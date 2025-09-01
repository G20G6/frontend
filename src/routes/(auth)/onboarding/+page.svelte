<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Input, Label } from 'flowbite-svelte';

	const user = $state({
		type: '',
		name: ''
	});
	let pageState = $state({
		continueBtnDisabled: true,
		nextPage: ''
	});
	const handleClick = (value: string) => {
		user.type = value;
		switch (value) {
			case 'tourist':
				pageState.nextPage = '/onboarding/tourist';
				break;
			case 'business':
				pageState.nextPage = '/onboarding/business';
				break;
			case 'youth':
				pageState.nextPage = '/onboarding/youth';
				break;
			default:
				pageState.nextPage = '';
		}
		if (pageState.nextPage.length) {
			pageState.continueBtnDisabled = false;
		}
	};

	const btns = [
		{ label: "I'm a tourist", value: 'tourist' },
		{ label: "I'm a business owner", value: 'business' },
		{ label: "I'm a youth", value: 'youth' }
	];
</script>

<div class="flex w-full items-center justify-center bg-white lg:min-h-screen">
	<div class="w-full max-w-md rounded-lg bg-white p-8">
		<h2 class="mb-6 text-center text-2xl font-bold">What bring you to Kasi Khaya?</h2>

		{#each btns as btn}
			<Button
				color="alternative"
				onclick={() => handleClick(btn.value)}
				class=" {btn.value === user.type
					? 'border-2 border-primary-500 text-primary-500'
					: ''} mb-4 w-full">{btn.label}</Button
			>
		{/each}

		<Button href={pageState.nextPage} disabled={pageState.continueBtnDisabled} class="mb-4 w-full"
			>Continue</Button
		>
	</div>
</div>
