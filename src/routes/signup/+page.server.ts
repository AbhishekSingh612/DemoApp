import { hash } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { validateUsername, validatePassword, validateNotBlank, generateUserId } from "$lib/utils";


export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('email');
		const password = formData.get('password');
		const firstname = formData.get('first-name');
		const lastname = formData.get('last-name');

		if (!validateUsername(username)) {
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

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash, firstname, lastname });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/');
	},
};
