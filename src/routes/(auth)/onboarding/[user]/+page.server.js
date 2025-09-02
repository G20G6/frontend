import { redirect } from '@sveltejs/kit';
import { user_types } from '../model.js';

export const load = ({ params, url }) => {
    const user_type = params.user;
	// @ts-ignore
	if (!user_types.includes(user_type)) {
		// redirect to onboarding page
		redirect(302, '/onboarding');
	}
}