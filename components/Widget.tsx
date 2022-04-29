import React from 'react';

type WidgetProps = {
    width: number;
    height: number;
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

const Widget = ({ width, height, image }: WidgetProps) => {
    return (
        <svg
            fill="none"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <image href={image ?? null} width={width} height={height} />
            {/* <foreignObject>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
                    style={{ width: 64, height: 64, display: 'flex' }}
                >
                    <style>{`
                    * {
                        margin: 0;
                        box-sizing: border-box;
                    }
                    `}</style>
                    <img src={image ?? null} width={64} height={64} />
                </div>
            </foreignObject> */}
        </svg>
    );
};

export default Widget;
