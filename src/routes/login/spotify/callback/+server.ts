import {createSession, generateSessionToken, setSessionTokenCookie} from "$lib/server/auth";
import {spotify} from "$lib/server/oauth/spotify";
import type {OAuth2Tokens} from "arctic";

import type {RequestEvent} from "@sveltejs/kit";
import {createOAuthUser, getOAuthUserByProviderIdAndProvider} from "$lib/server/db/auth_repository";

export async function GET(event: RequestEvent): Promise<Response> {
    console.log("Enter callback..")
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("spotify_oauth_state") ?? null;
    const codeVerifier = event.cookies.get("spotify_code_verifier") ?? null;
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
        tokens = await spotify.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {
        // Invalid code or client credentials
        return new Response(null, {
            status: 400
        });
    }
    const accessToken = tokens.accessToken();
    // const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
    // const refreshToken = tokens.refreshToken();
    const userProfile = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const user = await userProfile.json();

    const spotifyUserId = user.id;
    const email = user.email;
    const firstName = user.display_name;
    const lastName = '';
    const pictureUrl = user.images?.[0]?.url || null

    const existingUser = await getOAuthUserByProviderIdAndProvider(spotifyUserId, 'spotify');

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

    const userId = await createOAuthUser('spotify', spotifyUserId, firstName, lastName, email, pictureUrl);

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