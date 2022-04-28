import { VercelRequest, VercelResponse } from '@vercel/node';
import { renderToString } from 'react-dom/server';
import { imageUrlToBase64 } from '../utils/image';
import { nowPlaying } from '../utils/spotify';

export default async (req: VercelRequest, res: VercelResponse) => {
    const {
        item = {},
        is_playing: isPlaying = false,
        progress_ms: progress = 0,
    } = await nowPlaying();

    const isOpen = req.query.open === '';

    if (isOpen) {
        if (item && item.external_urls) {
            return res
                .writeHead(302, {
                    Location: item.external_urls.spotify,
                })
                .end();
        }

        return res.status(200).end();
    }

    const { duration_ms: duration, name: track, album: albumObj = {} } = item;
    const { name: album, images = [] } = albumObj;
    const artists =
        (item.artists || []).map((a) => a.name).join(', ') || undefined;

    const song = {
        track,
        artists,
        album,
    };

    const coverUrl = images[images.length - 1]?.url;
    const image = coverUrl ? await imageUrlToBase64(coverUrl) : undefined;

    return res.json({
        song,
        isPlaying,
        progress,
        duration,
        image,
    });
};
