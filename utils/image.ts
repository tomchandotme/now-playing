import createFetch from '@vercel/fetch';

const fetch = createFetch();

export const imageUrlToBase64 = async (imageUrl: string) => {
    const imageBuffer = await (await fetch(imageUrl)).arrayBuffer();

    return `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
        'base64'
    )}`;
};
