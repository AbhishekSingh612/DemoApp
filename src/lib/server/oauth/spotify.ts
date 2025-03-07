import { Spotify } from "arctic";
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "$env/static/private";

export const spotify = new Spotify(
    SPOTIFY_CLIENT_ID,
    null,
    SPOTIFY_REDIRECT_URI
);