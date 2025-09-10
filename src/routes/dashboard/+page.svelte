<script>
	import { fade, scale } from 'svelte/transition';
	import Seo from '$lib/ui/SEO.svelte';
	import { goto } from '$app/navigation';
	import { dashboardState } from './data/controller.svelte';

	//viewable by tourist, business and youth
	//will be able to display based on user type
	const userType = dashboardState.user_type;

	switch (userType) {
		case 'business':
			goto('/dashboard/business');
			break;
		case 'tour-guide':
			goto('/dashboard/youth');
			break;
		case 'data-collector':
			goto('/dashboard/youth');
			break;
		default:
			break;
	}
</script>

<Seo title="Dashboard" desc="Dashboard" langs={['en-ZA', 'en-US']} />

<section transition:scale class="bg-background bg-primary-100 py-2"></section>
