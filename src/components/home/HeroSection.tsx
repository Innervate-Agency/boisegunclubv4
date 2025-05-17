'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import ClayFragments with dynamic loading for proper client-side rendering
const ClayFragments = dynamic(() => import('../effects/ClayFragments'), {
  ssr: false
});

// Dynamically import WavyGridBackground to prevent hydration issues
const WavyGridBackground = dynamic(() => import('../effects/WavyGridBackground'), {
  ssr: false, // Disable server-side rendering
  loading: () => <div className="absolute inset-0 bg-[var(--bg-primary)]"></div>
});

function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax values
    const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -25]);
    const ctaY = useTransform(scrollYProgress, [0, 0.3], [0, -15]);
    const logoY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 25,
                y: (e.clientY - window.innerHeight / 2) / 25
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-[var(--bg-primary)] text-white">
            {/* Dramatic WavyGrid background */}
            <WavyGridBackground
                lineColor="rgba(242, 135, 5, 0.2)"
                numLinesX={35}
                numLinesY={20}
                waveAmplitude={5}
                waveFrequency={0.02}
                waveSpeed={0.05}
                gridRotationX={65}
                perspectiveValue={1000}
                gridScale={2}
                className="absolute inset-0 z-0" />

            {/* Deep gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-[rgba(18,18,18,0.6)] to-[rgba(18,18,18,0.9)] z-[1]" />

            {/* Floating geometric accent elements */}
            <div className="absolute inset-0 z-[2] overflow-hidden">
                {/* Large glowing orb */}
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#F25D27]/10 to-[#F2CB05]/5 rounded-full blur-[140px] transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        transform: `translate(calc(-50% + ${mousePosition.x * 0.3}px), calc(-50% + ${mousePosition.y * 0.3}px))`
                    }} />

                {/* Secondary glow */}
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[#521623]/20 to-[#F28705]/5 rounded-full blur-[100px] transform translate-x-1/2 translate-y-1/2"
                    style={{
                        transform: `translate(calc(50% - ${mousePosition.x * 0.5}px), calc(50% - ${mousePosition.y * 0.5}px))`
                    }} />

                {/* Clay target fragments - Client-side only rendering */}
                <ClayFragments count={5} />
            </div>

            {/* Main Content with Parallax */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-12"
                style={{ opacity }}
            >
                {/* Logo with premium glow effect */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 relative"
                    style={{ y: logoY, scale: logoScale }}
                >
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#F28705] to-[#E85E27] p-[3px] shadow-[0_0_40px_rgba(242,135,5,0.4)]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center backdrop-blur-lg border border-[rgba(242,135,5,0.3)]">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F28705] to-[#E85E27] flex items-center justify-center animate-pulse">
                                <div className="w-16 h-16 rounded-full bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F28705] to-[#E85E27]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Light rays */}
                    <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-full bg-[#F28705]/10 animate-pulse blur-xl" />
                </motion.div>

                {/* Modern Typography Stack */}
                <div className="text-center max-w-7xl">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] mb-2 tracking-tight uppercase"
                        style={{ y: titleY }}
                    >
                        <span className="block">Boise</span>
                        <span className="gradient-text bg-gradient-to-r from-[#F28705] via-[#F2CB05] to-[#F28705] block mt-4">
                            Gun Club
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-2xl md:text-3xl text-white/60 mt-4 tracking-[0.3em] lg:mt-8"
                        style={{ y: titleY }}
                    >
                        EST. 1898
                    </motion.p>
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-body text-xl md:text-2xl text-white/80 max-w-3xl text-center mt-12"
                    style={{ y: subtitleY }}
                >
                    Idaho&apos;s Premier Shotgun Sports Complex<br />
                    Where legends are forged and clay meets steel.
                </motion.p>

                {/* CTA Buttons with enhanced hover effects */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-6 mt-12"
                    style={{ y: ctaY }}
                >
                    <Link
                        href="/membership"
                        className="group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F28705] to-[#E85E27] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F28705]/20 to-[#E85E27]/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110" />

                        <button className="relative bg-gradient-to-r from-[#F28705] to-[#E85E27] text-white px-10 py-5 rounded-lg font-heading text-lg tracking-wide transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(242,135,5,0.6)] group-hover:scale-105 group-hover:translate-y-[-2px] overflow-hidden">
                            <span className="relative z-10">JOIN THE CLUB</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        </button>
                    </Link>

                    <Link
                        href="/ranges"
                        className="group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 border-2 border-[#F28705] blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500" />

                        <button className="relative border-2 border-[#F28705] text-[#F28705] px-10 py-5 rounded-lg font-heading text-lg tracking-wide transition-all duration-500 backdrop-blur-md bg-[rgba(18,18,18,0.3)] group-hover:bg-[#F28705]/20 group-hover:text-white group-hover:scale-105 group-hover:translate-y-[-2px] group-hover:shadow-[0_0_20px_rgba(242,135,5,0.3)] overflow-hidden">
                            <span className="relative z-10">VISIT RANGES</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F28705]/0 to-[#F28705]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator - Shotgun Shell Design */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, 10, 0], opacity: 1 }}
                transition={{
                    opacity: { delay: 1.8 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                {/* Shotgun shell */}
                <div className="relative h-16 w-8">
                    {/* Shell casing */}
                    <div className="absolute w-8 h-10 rounded-t-md overflow-hidden bg-gradient-to-b from-[#F2CB05] to-[#F28705]">
                        {/* Shell ridges */}
                        <div className="w-full h-full flex flex-col justify-around opacity-30">
                            <div className="h-[1px] w-full bg-black"></div>
                            <div className="h-[1px] w-full bg-black"></div>
                            <div className="h-[1px] w-full bg-black"></div>
                        </div>
                    </div>

                    {/* Shell cap */}
                    <div className="absolute top-10 w-8 h-2 bg-[#303030] rounded-b-sm"></div>

                    {/* Falling BBs */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-[#808080]"
                            style={{ left: `${i * 2 + 1}px`, top: "12px" }}
                            animate={{
                                y: [0, 30],
                                opacity: [1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeIn"
                            }} />
                    ))}
                </div>

                <span className="text-sm font-heading text-white/40 uppercase tracking-wider">Scroll</span>
            </motion.div>
        </section>
    );
}

export default HeroSection;
