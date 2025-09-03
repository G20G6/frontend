<script>
	import { fade, scale } from 'svelte/transition';
	import { dashboardState, getDashboardUser } from './data/controller.svelte';

	//viewable by tourist, business and youth
	//will be able to display based on user type

	const user = getDashboardUser(dashboardState.user_type);
</script>

<section transition:scale class="bg-background bg-primary-100 py-2">
	<user.page />
</section>
