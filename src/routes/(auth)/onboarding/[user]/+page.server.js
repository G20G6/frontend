import { redirect } from '@sveltejs/kit';

export const load = ({ params, url }) => {
    const user_type = params.user;
    const user_types = ['tourist', 'business', 'youth'];

	// @ts-ignore
	if (!user_types.includes(user_type)) {
		// redirect to onboarding page
		redirect(302, '/onboarding');
	}
}