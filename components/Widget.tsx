import React from 'react';

const WIDTH = 960;
const HEIGHT = 160;
const IMAGE_SIZE = 128;
const PADDING = 16;
const REM = 32;

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
                    dx={0}
                    dy={1}
                    stdDeviation={1}
                    floodOpacity={0.5}
                    floodColor="#333"
                />
                <feDropShadow
                    dx={0}
                    dy={0}
                    stdDeviation={3}
                    floodOpacity={0.5}
                    floodColor="#333"
                />
            </filter>
            <defs>
                <style
                    children={`
                        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');
                        rect, image, text {
                            filter: url(#shadow);
                        }
                        text {
                            filter: url(#shadow);
                            font-family: 'Noto Sans TC', sans-serif;
                        }
                    `}
                />
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
                        fontSize={REM}
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
                        fontSize={0.875 * REM}
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
                        fontSize={1.25 * REM}
                        fill="#fff"
                    >
                        Nothing Playing...
                    </text>
                </g>
            )}
        </svg>
    );
};

export default Widget;
