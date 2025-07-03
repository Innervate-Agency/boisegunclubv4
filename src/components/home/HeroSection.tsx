'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import Section from '@/components/layout/Section';

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth parallax transforms - more subtle for modern feel
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
    const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
    const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <Section isHero background="grid" overlay={false}>
            <div ref={containerRef} className="relative min-h-screen overflow-hidden">            
                {/* Background Image with enhanced overlay */}
                <motion.div 
                    className="absolute inset-0 w-full h-full"
                    style={{ scale: bgScale }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/hero-bg.webp"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                            alt="Boise Gun Club - Premier Shooting Sports Facility"
                            sizes="100vw"
                        />
                        {/* Enhanced gradient overlay for better text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
                        {/* Subtle bottom fade for CTA emphasis */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                </motion.div>

                {/* Content with improved spacing and hierarchy */}
                <div className="container-custom relative z-10 h-screen flex flex-col justify-center items-center text-center">
                    {/* Logo with enhanced animation */}
                    <motion.div 
                        style={{ opacity, y: titleY }}
                        className="mb-8 lg:mb-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] mx-auto">
                            <Image
                                src="/images/bgcv3-shattered-clay.svg"
                                fill
                                alt="Boise Gun Club Logo"
                                className="drop-shadow-2xl"
                                priority
                                sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                            />
                        </div>
                    </motion.div>

                    {/* Main heading with improved typography */}
                    <motion.div 
                        style={{ opacity, y: titleY }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1 className="mb-6 lg:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white font-['Rajdhani'] leading-none">
                            <span className="block">BOISE</span>
                            <span className="block text-[var(--accent-primary)] retro-glow">GUN CLUB</span>
                        </h1>
                    </motion.div>

                    {/* Subtitle with enhanced styling */}
                    <motion.div 
                        style={{ opacity, y: subtitleY }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mb-10 lg:mb-12"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-4xl mx-auto font-['Noto Sans'] leading-relaxed px-4">
                            Idaho's premier shooting sports facility since 1898.
                        </p>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-['Noto Sans'] mt-4 px-4">
                            Experience world-class trap, skeet, and sporting clays ranges in the heart of the Treasure Valley.
                        </p>
                    </motion.div>

                    {/* Enhanced CTA buttons */}
                    <motion.div 
                        style={{ opacity, y: ctaY }} 
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <Link 
                            href="/membership"
                            className="btn-primary-modern glow-button min-w-[200px] text-center group"
                        >
                            <span className="relative z-10">BECOME A MEMBER</span>
                        </Link>
                        
                        <Link 
                            href="/ranges"
                            className="btn-secondary-modern min-w-[200px] text-center group"
                        >
                            EXPLORE RANGES
                        </Link>
                    </motion.div>

                    {/* Enhanced trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="mt-12 lg:mt-16"
                        style={{ opacity }}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-['Noto Sans']">Founded 1898</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-['Noto Sans']">1200+ Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-['Noto Sans']">320 Acres</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                >
                    <div className="flex flex-col items-center text-gray-300 group cursor-pointer">
                        <span className="text-sm mb-3 font-['Noto Sans'] transition-colors group-hover:text-[var(--accent-primary)]">
                            Scroll to explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center group-hover:border-[var(--accent-primary)] transition-colors"
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-3 bg-gray-300 rounded-full mt-2 group-hover:bg-[var(--accent-primary)] transition-colors"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

export default HeroSection;
