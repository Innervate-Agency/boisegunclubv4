'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react'; // Added useMemo
import useDeterministicRandom from '../../hooks/useDeterministicRandom';

export type MembershipTier = {
    id: string;
    name: string;
    price: number;
    period: 'month' | 'year';
    description: string;
    benefits: string[];
    featured?: boolean;
};

type MembershipCardProps = {
    tier: MembershipTier;
    onSelect: (tierId: string) => void;
};

const MembershipCard = ({ tier, onSelect }: MembershipCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    // Use deterministic random for consistent rendering
    const { getRandomValue } = useDeterministicRandom(24, parseInt(tier.id, 36) || 42);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Smoke particles for hover effect with deterministic positions
    const smokeParticles = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            delay: i * 0.1,
            x: isMounted ? getRandomValue(i * 2, -20, 20) : 0,
            y: isMounted ? -getRandomValue(i * 2 + 1, 20, 60) : -30,
        }));
    }, [isMounted, getRandomValue]); // Memoize smokeParticles

    return (
        <motion.div
            className={`relative group overflow-hidden rounded-2xl ${tier.featured ? 'scale-105' : ''
                }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            {/* Background layers */}
            <div className="absolute inset-0 bg-[#5D4037]/20 backdrop-blur-md" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />

            {/* Parallel lines background pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FFBF00 10px, #FFBF00 11px)',
                }} />
            </div>

            {/* Smoke effect particles */}
            {isHovered && smokeParticles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        x: particle.x,
                        y: particle.y,
                        scale: 1.5,
                    }}
                    transition={{
                        duration: 1.5,
                        delay: particle.delay,
                        ease: 'easeOut',
                    }}
                />
            ))}

            {/* Card content */}
            <div className="relative p-8 transform-gpu transition-transform duration-500 hover:scale-[1.02]">
                {/* Featured badge */}
                {tier.featured && (
                    <div className="absolute -top-1 -right-1 bg-[#FFBF00] text-[#5D4037] px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold text-sm transform rotate-3">
                        MOST POPULAR
                    </div>
                )}

                {/* Tier name with Art Deco styling */}
                <h3 className="text-3xl font-bold mb-4 text-[#FFBF00]" style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    letterSpacing: '0.1em',
                    textShadow: '2px 2px 0px rgba(93, 64, 55, 0.5)',
                }}>
                    {tier.name.toUpperCase()}
                </h3>

                {/* Price */}
                <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-white/70">/{tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-white/80 mb-6">{tier.description}</p>

                {/* Benefits list */}
                <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-white/90">
                            <svg className="w-5 h-5 mr-3 text-[#FFBF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit}
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                    onClick={() => onSelect(tier.id)}
                    className="w-full py-4 px-8 rounded-lg bg-[#FFBF00] text-[#5D4037] font-bold text-lg 
                             hover:bg-[#FFD700] transform transition-all duration-300
                             hover:shadow-[0_0_20px_rgba(255,191,0,0.3)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Select {tier.name}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default MembershipCard;