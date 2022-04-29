import { ReadableByteStreamController } from 'node:stream/web';
import React from 'react';

const WIDTH = 480;
const HEIGHT = 80;
const IMAGE_SIZE = 64;
const PADDING = 8;

type WidgetProps = {
    song: {
        track?: string;
        artists?: string;
        album?: string;
    };
    isPlaying: boolean;
    progress: number;
    duration: number;
    image?: string;
};

const Widget = ({ image, song }: WidgetProps) => {
    return (
        <svg
            fill="none"
            width={WIDTH}
            height={HEIGHT}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <filter id="shadow" colorInterpolationFilters="sRGB">
                <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1"
                    floodOpacity="0.5"
                />
                <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="3"
                    floodOpacity="0.5"
                />
            </filter>
            <defs>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');
                        rect, image, text {
                            filter: url(#shadow);
                        }
                        text {
                            filter: url(#shadow);
                            font-family: 'Noto Sans TC', sans-serif;
                        }
                    `}
                </style>
            </defs>
            {song.track && (
                <g>
                    <image
                        href={image ?? null}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        x={PADDING}
                        y={PADDING}
                    />
                    <text
                        className="text"
                        x={IMAGE_SIZE + PADDING * 3}
                        y={HEIGHT / 4}
                        width={WIDTH - IMAGE_SIZE - PADDING * 3}
                        height={HEIGHT / 2}
                        alignmentBaseline="central"
                        fontWeight={700}
                        fontSize={16}
                        fill="#fff"
                    >
                        {song.track}
                    </text>
                    <text
                        className="text"
                        x={IMAGE_SIZE + PADDING * 3}
                        y={(HEIGHT * 3) / 4}
                        width={WIDTH - IMAGE_SIZE - PADDING * 3}
                        height={HEIGHT / 2}
                        alignmentBaseline="central"
                        fontWeight={400}
                        fontSize={14}
                        fill="#fff"
                    >
                        {`${song.artists} - ${song.album}`}
                    </text>
                </g>
            )}
            {!image && !song.track && (
                <g>
                    <rect
                        fill="#fff"
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        x={PADDING}
                        y={PADDING}
                    />
                    <text
                        className="text"
                        x={IMAGE_SIZE + PADDING * 3}
                        y={HEIGHT / 2}
                        width={WIDTH - IMAGE_SIZE - PADDING * 3}
                        height={HEIGHT}
                        alignmentBaseline="central"
                        fontWeight={400}
                        fontSize={20}
                        fill="#fff"
                    >
                        Nothing Playing...
                    </text>
                </g>
            )}
            {/* Fix of blurry text on mobile */}
            <text transform="matrix(1 0 0 1 7.1079 13.5215)" opacity="0">
                a
            </text>
        </svg>
    );
};

export default Widget;
