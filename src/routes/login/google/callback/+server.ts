import {createSession, generateSessionToken, setSessionTokenCookie} from "$lib/server/auth";
import {google} from "$lib/server/oauth/google";
import type {OAuth2Tokens} from "arctic";
import {decodeIdToken} from "arctic";

import type {RequestEvent} from "@sveltejs/kit";
import {createOAuthUser, getOAuthUserByProviderIdAndProvider} from "$lib/server/db/auth_repository";

export async function GET(event: RequestEvent): Promise<Response> {
    console.log("Enter callback..")
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("google_oauth_state") ?? null;
    const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
    if (code === null || state === null || storedState === null || codeVerifier === null) {
        return new Response(null, {
            status: 400
        });
    }
    if (state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    console.log(
        "Validating code and state..",
        code,
        state,
        storedState,
        codeVerifier);
    let tokens: OAuth2Tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {
        // Invalid code or client credentials
        return new Response(null, {
            status: 400
        });
    }
    const claims = decodeIdToken(tokens.idToken()) as {
        sub: string,
        email: string,
        given_name: string,
        family_name: string
    };

    console.log(
        "Got tokens and claims..",
        tokens,
        claims);

    const googleUserId = claims.sub;
    const email = claims.email;
    const firstName = claims.given_name;
    const lastName = claims.family_name;

    const existingUser = await getOAuthUserByProviderIdAndProvider(googleUserId);

    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser.userId);
        setSessionTokenCookie(event, sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }

    const userId = await createOAuthUser('google', googleUserId, firstName, lastName, email);

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, userId);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/"
        }
    });
}