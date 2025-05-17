'use client';

import { FC } from 'react';

interface LogoProps {
    className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer Circle */}
            <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="2" />

            {/* Inner Design - Crossed Rifles */}
            <g transform="rotate(45 60 60)">
                <rect x="30" y="58" width="60" height="4" rx="2" fill="currentColor" />
                <rect x="58" y="30" width="4" height="60" rx="2" fill="currentColor" />
            </g>

            {/* Target Points */}
            <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="60" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="60" r="3" fill="currentColor" />

            {/* Decorative Elements */}
            <path
                d="M20 60a40 40 0 0 1 80 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M100 60a40 40 0 0 1-80 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
};

export default Logo; 