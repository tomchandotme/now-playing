import { VercelRequest, VercelResponse } from '@vercel/node';
import { renderToString } from 'react-dom/server';
import qs from 'query-string';
import { nowPlaying } from '../utils/spotify';

export default async (req: VercelRequest, res: VercelResponse) => {
    const {
        item = {},
        is_playing: isPlaying = false,
        progress_ms: progress = 0,
    } = await nowPlaying();

    const { duration_ms: duration, name: track } = item;
    const album = (item.album || {}).name;
    const artists = (item.artists || []).map((a) => a.name).join(', ');

    res.send({
        song: item
            ? {
                  track,
                  artists,
                  album,
              }
            : {},
        isPlaying,
        progress,
        duration,
    });
};
