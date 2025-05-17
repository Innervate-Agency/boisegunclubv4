'use client';

import React from 'react';
import { motion, useTime, useTransform, MotionValue } from 'framer-motion';
import useWindowSize from '../../hooks/useWindowSize';

interface WavyGridBackgroundProps {
    lineColor?: string;
    lineGlow?: string;
    lineShadow?: string;
    numLinesX?: number;
    numLinesY?: number;
    waveAmplitude?: number;
    waveFrequency?: number;
    waveSpeed?: number;
    className?: string;
    gridRotationX?: number;
    perspectiveValue?: number;
    gridTranslateZ?: number;
    gridScale?: number;
    gridWidth?: number;
    gridHeight?: number;
    isResponsive?: boolean;
    fadeEdges?: boolean;
}

interface WavyHorizontalLineProps {
    baseY: number;
    gridWidth: number;
    strokeColor: string;
    glowColor?: string;
    shadowColor?: string;
    waveAmplitude: number;
    waveFrequency: number;
    waveSpeed: number;
    time: MotionValue<number>;
    numSegments: number;
    strokeWidth?: number;
    fadeEdges?: boolean;
}

const WavyHorizontalLine: React.FC<WavyHorizontalLineProps> = ({
    baseY,
    gridWidth,
    strokeColor,
    glowColor,
    shadowColor,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    time,
    numSegments,
    strokeWidth = 1,
    fadeEdges = false
}) => {
    const d = useTransform(time, currentTime => {
        const timeFactor = currentTime / 1000;
        let pathData = `M 0 ${baseY + waveAmplitude * Math.sin(0 * waveFrequency + timeFactor * waveSpeed)}`;
        for (let seg = 1; seg <= numSegments; seg++) {
            const x = (gridWidth / numSegments) * seg;
            const yOffset = waveAmplitude * Math.sin(x * waveFrequency + timeFactor * waveSpeed);
            pathData += ` L ${x} ${baseY + yOffset}`;
        }
        return pathData;
    });

    return (
        <>
            {/* Shadow effect */}
            {shadowColor && (
                <motion.path
                    d={d}
                    stroke={shadowColor}
                    strokeWidth={strokeWidth * 1.5}
                    strokeOpacity={0.4}
                    fill="none"
                    filter="blur(3px)"
                />
            )}

            {/* Main line */}
            <motion.path
                d={d}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="none"
                style={fadeEdges ? {
                    maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                } : undefined}
            />

            {/* Glow effect */}
            {glowColor && (
                <motion.path
                    d={d}
                    stroke={glowColor}
                    strokeWidth={strokeWidth * 2.5}
                    strokeOpacity={0.2}
                    fill="none"
                    filter="blur(4px)"
                />
            )}
        </>
    );
};

const WavyGridBackground: React.FC<WavyGridBackgroundProps> = ({
    lineColor = 'rgba(242, 135, 5, 0.2)',
    lineGlow = 'rgba(242, 135, 5, 0.5)',
    lineShadow = 'rgba(0, 0, 0, 0.5)',
    numLinesX = 50,
    numLinesY = 30,
    waveAmplitude = 3,
    waveFrequency = 0.03,
    waveSpeed = 0.05,
    className = '',
    gridRotationX = 60,
    perspectiveValue = 1000,
    gridTranslateZ = -200,
    gridScale = 1.5,
    gridWidth = 1200,
    gridHeight = 800,
    isResponsive = true,
    fadeEdges = true,
}) => {
    const time = useTime();
    const numSegments = 50;
    const lineStrokeWidth = 0.5;
    
    // Get window dimensions safely with our custom hook
    const dimensions = useWindowSize(gridWidth, gridHeight);

    // Adjust grid size for responsive mode
    const responsiveWidth = isResponsive ? dimensions.width * 1.5 : gridWidth;
    const responsiveHeight = isResponsive ? dimensions.height * 1.5 : gridHeight;

    // Dynamic grid spacing based on screen size
    const xSpacing = responsiveWidth / (numLinesX + 1);
    const ySpacing = responsiveHeight / (numLinesY + 1);

    // Calculate line width based on screen size
    const dynamicStrokeWidth = isResponsive
        ? Math.max(0.5, Math.min(1, dimensions.width / 1920))
        : lineStrokeWidth;

    return (
        <div
            className={`absolute inset-0 overflow-hidden ${className}`}
            style={{
                perspective: `${perspectiveValue}px`,
                perspectiveOrigin: '50% 50%',
            }}
        >
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                }}
            >
                <motion.svg
                    width={responsiveWidth}
                    height={responsiveHeight}
                    viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}
                    style={{
                        transform: `translateZ(${gridTranslateZ}px) rotateX(${gridRotationX}deg) scale(${gridScale})`,
                        overflow: 'visible',
                        transformOrigin: 'center center',
                    }}
                >
                    {/* Vertical Lines - with depth effect */}
                    {Array.from({ length: numLinesX }).map((_, i) => {
                        // Calculate opacity and width based on position to create depth
                        const xPos = (i + 1) * xSpacing;
                        const distanceFromCenter = Math.abs(xPos - (responsiveWidth / 2));
                        const maxDistance = responsiveWidth / 2;
                        const opacityFactor = fadeEdges
                            ? Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7)
                            : 1;

                        return (
                            <React.Fragment key={`v-line-${i}`}>
                                {/* Shadow */}
                                <motion.line
                                    x1={(i + 1) * xSpacing}
                                    y1={0}
                                    x2={(i + 1) * xSpacing}
                                    y2={responsiveHeight}
                                    stroke={lineShadow}
                                    strokeWidth={dynamicStrokeWidth * 1.5}
                                    strokeOpacity={0.3 * opacityFactor}
                                    filter="blur(2px)"
                                />

                                {/* Main line */}
                                <motion.line
                                    x1={(i + 1) * xSpacing}
                                    y1={0}
                                    x2={(i + 1) * xSpacing}
                                    y2={responsiveHeight}
                                    stroke={lineColor}
                                    strokeWidth={dynamicStrokeWidth}
                                    strokeOpacity={opacityFactor}
                                />

                                {/* Glow effect */}
                                <motion.line
                                    x1={(i + 1) * xSpacing}
                                    y1={0}
                                    x2={(i + 1) * xSpacing}
                                    y2={responsiveHeight}
                                    stroke={lineGlow}
                                    strokeWidth={dynamicStrokeWidth * 2}
                                    strokeOpacity={0.15 * opacityFactor}
                                    filter="blur(3px)"
                                />
                            </React.Fragment>
                        );
                    })}

                    {/* Horizontal Wavy Lines */}
                    {Array.from({ length: numLinesY }).map((_, i) => {
                        const baseY = (i + 1) * ySpacing;

                        // Calculate opacity based on position to create depth
                        const distanceFromCenter = Math.abs(baseY - (responsiveHeight / 2));
                        const maxDistance = responsiveHeight / 2;
                        const opacityFactor = fadeEdges
                            ? Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7)
                            : 1;

                        return (
                            <WavyHorizontalLine
                                key={`h-line-${i}`}
                                baseY={baseY}
                                gridWidth={responsiveWidth}
                                strokeColor={lineColor}
                                glowColor={lineGlow}
                                shadowColor={lineShadow}
                                waveAmplitude={waveAmplitude * (1 - (i / numLinesY) * 0.3)} // Decrease amplitude slightly for lines further down
                                waveFrequency={waveFrequency}
                                waveSpeed={waveSpeed * (1 + (i / numLinesY) * 0.2)} // Increase speed slightly for lines further down
                                time={time}
                                numSegments={numSegments}
                                strokeWidth={dynamicStrokeWidth * opacityFactor}
                                fadeEdges={fadeEdges}
                            />
                        );
                    })}

                    {/* Subtle vignette overlay for depth */}
                    {fadeEdges && (
                        <radialGradient id="vignette" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                        </radialGradient>
                    )}

                    {fadeEdges && (
                        <rect
                            x="0"
                            y="0"
                            width={responsiveWidth}
                            height={responsiveHeight}
                            fill="url(#vignette)"
                            opacity="0.5"
                        />
                    )}
                </motion.svg>
            </motion.div>
        </div>
    );
};

export default WavyGridBackground;
