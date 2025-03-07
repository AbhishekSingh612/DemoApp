import { generateState, generateCodeVerifier } from "arctic";
import { spotify } from "$lib/server/oauth/spotify";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = spotify.createAuthorizationURL(state, codeVerifier, ["user-read-playback-state", "user-modify-playback-state", "user-read-email", "user-read-private"]);

    event.cookies.set("spotify_oauth_state", state, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });
    event.cookies.set("spotify_code_verifier", codeVerifier, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
}