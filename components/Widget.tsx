import React from 'react';

const WIDTH = 320;
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

                        .text {
                            filter: url(#shadow);
                        }
                    `}
                </style>
            </defs>
            <image
                href={image ?? null}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                x={PADDING}
                y={PADDING}
            />
            {song.track && (
                <g>
                    <text
                        className="text"
                        x={IMAGE_SIZE + PADDING * 2}
                        y={HEIGHT / 4}
                        width={WIDTH - IMAGE_SIZE - PADDING * 2}
                        height={HEIGHT / 2}
                        alignmentBaseline="central"
                        fontFamily="Noto Sans TC"
                        fontWeight={700}
                        fontSize={16}
                        fill="#fff"
                    >
                        {song.track}
                    </text>
                    <text
                        className="text"
                        x={IMAGE_SIZE + PADDING * 2}
                        y={(HEIGHT * 3) / 4}
                        width={WIDTH - IMAGE_SIZE - PADDING * 2}
                        height={HEIGHT / 2}
                        alignmentBaseline="central"
                        fontFamily="Noto Sans TC"
                        fontWeight={400}
                        fontSize={14}
                        fill="#fff"
                    >
                        {`${song.artists} - ${song.album}`}
                    </text>
                </g>
            )}
            {/* <foreignObject>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, display: 'flex' }}
                >
                    <style>{`
                    * {
                        margin: 0;
                        box-sizing: border-box;
                    }
                    `}</style>
                    <img src={image ?? null} width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </div>
            </foreignObject> */}
        </svg>
    );
};

export default Widget;
