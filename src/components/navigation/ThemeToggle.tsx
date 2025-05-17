'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ui/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <motion.button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
            className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-hidden focus:outline-none glass-effect"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
        >
            {/* Psychedelic background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/30 to-[var(--accent-secondary)]/30 opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-full" />

            {/* Animated glow ring */}
            <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full bg-transparent border-2 border-[var(--accent-quaternary)]/40 animate-pulse" />
            </div>

            {/* Sun icon (shown in dark mode) - Made more groovy */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-[var(--accent-gold)]"
                initial={false}
                animate={{
                    opacity: theme === 'dark' ? 1 : 0,
                    y: theme === 'dark' ? 0 : 20,
                    rotate: theme === 'dark' ? 0 : 45,
                    scale: theme === 'dark' ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 drop-shadow-[0_0_3px_var(--accent-gold)]">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
            </motion.div>

            {/* Moon icon (shown in light mode) - Made more groovy */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-[var(--accent-deepblue)]"
                initial={false}
                animate={{
                    opacity: theme === 'light' ? 1 : 0,
                    y: theme === 'light' ? 0 : -20,
                    rotate: theme === 'light' ? 0 : -45,
                    scale: theme === 'light' ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-[0_0_3px_var(--accent-deepblue)]">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
            </motion.div>

            {/* Decorative colorful particles that appear on hover/interaction */}
            <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-[var(--accent-tertiary)] bubble-float" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[var(--accent-orangered)] bubble-float" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-[var(--accent-yellow)] bubble-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-3 right-2 w-2 h-2 rounded-full bg-[var(--accent-primary)] bubble-float" style={{ animationDelay: '0.7s' }}></div>
            </div>
        </motion.button>
    );
} 
