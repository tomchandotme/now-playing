import createFetch from '@vercel/fetch';
import qs from 'query-string';

const fetch = createFetch();

const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const Authorization = `Basic ${basic}`;

const getAuthorizationToken = async () => {
    const url = new URL('https://accounts.spotify.com/api/token');
    const body = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token,
    });
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            Authorization,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    }).then((r) => r.json());

    return `Bearer ${response.access_token}`;
};

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
export const nowPlaying = async () => {
    const Authorization = await getAuthorizationToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization,
        },
    });
    const { status } = response;
    if (status === 204) {
        return {};
    } else if (status === 200) {
        const data = await response.json();
        return data;
    }
};
