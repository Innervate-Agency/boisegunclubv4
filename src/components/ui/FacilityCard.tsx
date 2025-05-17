'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FacilityCardProps {
    title: string;
    icon: string;
    description: string;
    linkText: string;
    link: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({
    title,
    icon,
    description,
    linkText,
    link
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden h-full"
        >
            {/* Mica/Acrylic background blur effect */}
            <div className="absolute inset-0 backdrop-blur-2xl bg-[rgba(18,18,18,0.4)] border border-[rgba(255,255,255,0.08)] shadow-2xl z-0 group-hover:bg-[rgba(18,18,18,0.5)] transition-colors duration-500" />

            {/* Top gradient border */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/40 to-transparent z-[1]" />

            {/* Subtle corner gradients */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent z-[1]" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[var(--accent-primary)]/10 to-transparent z-[1]" />

            {/* Content container */}
            <div className="relative z-10 p-8">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[url('/images/Grid/Grid (1).jpg')] bg-cover opacity-5 mix-blend-overlay pointer-events-none" />

                {/* Icon and Title row */}
                <div className="flex items-center mb-6">
                    {/* Icon in fancy container */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg relative">
                            {/* Gradient border */}
                            <div className="absolute inset-0 p-[1px] rounded-xl">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/40 via-[var(--accent-primary)]/20 to-[var(--accent-primary)]/40 animate-gradient-slow" />
                            </div>

                            {/* Image */}
                            <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] overflow-hidden">
                                <Image
                                    src={icon}
                                    alt={title}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full filter saturate-[1.2]"
                                />
                            </div>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-[var(--accent-primary)]/20 transition-opacity duration-700" />
                        </div>

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/20 rounded-xl blur-xl transition-colors duration-700 -z-10" />
                    </div>

                    {/* Title with animated gradient on hover */}
                    <h3 className="text-2xl ml-5 font-heading tracking-wide group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:to-[var(--accent-primary)]/70 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {title}
                    </h3>
                </div>

                {/* Description with improved typography */}
                <p className="text-[var(--text-secondary)] mb-6 text-base font-body leading-relaxed">
                    {description}
                </p>

                {/* Animated link */}
                <Link
                    href={link}
                    className="inline-flex items-center text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-heading text-sm tracking-wide transition-colors duration-300 group-hover:translate-x-1"
                >
                    <span className="relative">
                        {linkText}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>

                {/* Interactive hover state shine effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 -z-10 overflow-hidden pointer-events-none"
                >
                    <div
                        className="absolute -inset-[100%] w-[300%] h-[300%] rotate-45 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default FacilityCard; 
