import {fail, redirect} from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type {Actions, PageServerLoad} from './$types';
import {validateEmail, validateNotBlank, validatePassword} from "$lib/utils";
import {getUserAuthByEmail, getUserByEmail, registerUserByEmail} from "$lib/server/db/auth_repository";
import type {User} from "$lib/server/db/schema";


export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const firstname = formData.get('first-name');
		const lastname = formData.get('last-name');

		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		if (!validateNotBlank(firstname)) {
			return fail(400, { message: 'Invalid first name' });
		}
		if (!validateNotBlank(lastname) ) {
			return fail(400, { message: 'Invalid last name' });
		}

		try {
			let [existingUser] = await getUserAuthByEmail(email);
			if (existingUser) {
				return fail(400, { message: 'Email already exists' });
			}

			const user: User = await registerUserByEmail(email, password, firstname, lastname);

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, user.userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/');
	},
};
