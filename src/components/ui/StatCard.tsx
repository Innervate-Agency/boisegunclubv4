'use client';

import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface StatCardProps {
    value: string;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Animation controls for value counter
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    const displayValue = useTransform(rounded, latest =>
        value.includes('+')
            ? `${latest}+`
            : value.includes('%')
                ? `${latest}%`
                : latest.toString()
    );

    // Smoother spring animation
    const springCount = useSpring(count, { stiffness: 100, damping: 30 });

    // Extract numeric part of the value
    const numericValue = parseInt(value.replace(/\D/g, ''));

    // Start counting animation when in view
    React.useEffect(() => {
        if (isInView) {
            count.set(numericValue);
        }
    }, [isInView, count, numericValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.8 }}
            className="group relative"
        >
            <div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-md px-6 py-7 rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Top light bar */}
                <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/40 to-transparent"></div>

                {/* Animated value counter */}
                <motion.div
                    className="text-5xl md:text-6xl font-bold text-[var(--accent-gold)] mb-2 font-heading relative z-10"
                    style={{
                        textShadow: "0 0 20px rgba(242, 203, 5, 0.3)",
                    }}
                >
                    {/* This shows original value if not a number */}
                    {isNaN(numericValue) ? (
                        <span>{value}</span>
                    ) : (
                        <motion.span>{displayValue}</motion.span>
                    )}
                </motion.div>

                {/* Label with glassmorphic tag */}
                <div className="relative">
                    <div className="text-white/80 text-sm font-body uppercase tracking-wider">{label}</div>

                    {/* Decorative accent element */}
                    <div className="absolute -top-1 -left-2 w-1 h-1 rounded-full bg-[var(--accent-gold)] opacity-70"></div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden transition-opacity duration-300">
                    <motion.div
                        className="absolute -inset-[100%] w-[300%] h-[300%] rotate-45 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={isInView ? { x: ["0%", "100%"] } : { x: "-100%" }}
                        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard; 
