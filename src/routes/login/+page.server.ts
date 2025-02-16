import {verify} from '@node-rs/argon2';
import {fail, redirect} from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type {Actions, PageServerLoad} from './$types';
import {validateEmail, validatePassword} from "$lib/utils";
import {getEmailAuthByEmail} from "$lib/server/db/auth_repository";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!validateEmail(email)) {
			return fail(400, { message: `Invalid email: ${email} (min 3, max 31 characters, alphanumeric only)` });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}

		const results = await getEmailAuthByEmail(email.toString());
		const existingUser = results.at(0);

		if (!existingUser) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.userId);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	}
};