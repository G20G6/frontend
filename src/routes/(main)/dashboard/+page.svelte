<script>
	import { fade, scale } from 'svelte/transition';
	import { getDashboardUser } from './data/controller.svelte';

	//viewable by tourist, business and youth
	//will be able to display based on user type
	const user_types = ['tourist', 'business', 'youth'];
	const type = user_types[Math.floor(Math.random() * user_types.length)];
	const user = getDashboardUser(type);
	console.log(user);
</script>

<section transition:scale class="bg-background bg-primary-100 py-2">
	<div class="container mx-auto px-4">
		<h1 class="mb-4 text-xl font-bold text-primary-800 md:text-5xl" in:fade={{ duration: 500 }}>
			{user?.page}
		</h1>
	</div>
</section>
