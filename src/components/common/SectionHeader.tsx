'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    gradientColors?: string[];
    accentLine?: boolean;
    className?: string;
    titleSize?: 'small' | 'medium' | 'large';
    withAnimation?: boolean;
    decorative?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    alignment = 'center',
    gradientColors = ['var(--accent-primary)', 'var(--accent-secondary)'],
    accentLine = true,
    className = '',
    titleSize = 'medium',
    withAnimation = true,
    decorative = true,
}) => {
    // Generate text alignment classes
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    // Generate gradient styles
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(', ')})`,
    };

    // Title size variations
    const titleSizeClasses = {
        small: 'text-3xl md:text-4xl',
        medium: 'text-4xl md:text-5xl lg:text-6xl',
        large: 'text-5xl md:text-6xl lg:text-7xl',
    };

    // Determine line alignment classes
    const lineAlignmentClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
    };

    // Animation variants
    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    const lineVariants = {
        hidden: {
            scaleX: 0,
            opacity: 0
        },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    const subtitleVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    // Element wrapper - conditionally applies animation
    const HeaderElement = withAnimation ? motion.div : 'div';
    const TitleElement = withAnimation ? motion.h2 : 'h2';
    const LineElement = withAnimation ? motion.div : 'div';
    const SubtitleElement = withAnimation ? motion.p : 'p';

    return (
        <HeaderElement
            className={`mb-16 ${alignmentClasses[alignment]} ${className}`}
            initial={withAnimation ? "hidden" : undefined}
            whileInView={withAnimation ? "visible" : undefined}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative inline-block">
                {/* Decorative elements - only shown if decorative is true */}
                {decorative && (
                    <>
                        {/* Top accent dot */}
                        <div className={`absolute -top-3 ${alignment === 'left' ? 'left-0' : alignment === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} w-1.5 h-1.5 rounded-full bg-gradient-to-br`} style={gradientStyle}></div>

                        {/* Subtle blurred glow */}
                        <div className={`absolute -inset-8 opacity-30 blur-2xl bg-gradient-to-br rounded-full -z-10`} style={gradientStyle}></div>
                    </>
                )}

                {/* Main title */}
                <TitleElement
                    className={`font-heading font-bold tracking-wider uppercase ${titleSizeClasses[titleSize]}`}
                    style={gradientColors.length > 1 ? {
                        backgroundImage: `linear-gradient(to right, ${gradientColors.join(', ')})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    } : {}}
                    variants={headerVariants}
                >
                    {title}
                </TitleElement>

                {/* Accent line */}
                {accentLine && (
                    <LineElement
                        className={`h-1 ${lineAlignmentClasses[alignment]} mt-4 rounded bg-gradient-to-r w-24 origin-left`}
                        style={gradientStyle}
                        variants={lineVariants}
                    />
                )}
            </div>

            {/* Optional subtitle */}
            {subtitle && (
                <SubtitleElement
                    className={`text-[var(--text-secondary)] max-w-2xl text-lg mt-6 font-body leading-relaxed ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}
                    variants={subtitleVariants}
                >
                    {subtitle}
                </SubtitleElement>
            )}
        </HeaderElement>
    );
};

export default SectionHeader; 
