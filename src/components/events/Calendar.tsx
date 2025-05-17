'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarProvider, useCalendar } from './CalendarContext';
import { useTheme } from '../ui/ThemeContext';
import { colors } from '../ui/theme';
import MonthView from './MonthView';
import WeekView from './WeekView';
import EventList from './EventList';
import EventDetail from './EventDetail';

// Terminal typing effect hook
function useTypingEffect(text: string, speed: number = 50) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        setIsComplete(false);
        setDisplayedText('');

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(prev => prev + text[currentIndex]);
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return { displayedText, isComplete };
}

// Theme toggle component
function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2 font-['VT323']">
            <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1 ${theme === 'light' ? 'text-accent border border-accent' : 'text-textSecondary hover:text-accent'}`}
            >
                LIGHT
            </button>
            <button
                onClick={() => setTheme('system')}
                className={`px-3 py-1 ${theme === 'system' ? 'text-accent border border-accent' : 'text-textSecondary hover:text-accent'}`}
            >
                SYSTEM
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 ${theme === 'dark' ? 'text-accent border border-accent' : 'text-textSecondary hover:text-accent'}`}
            >
                DARK
            </button>
        </div>
    );
}

// Calendar header with retro styling
function CalendarHeader() {
    const { viewMode, setViewMode } = useCalendar();
    const { displayedText } = useTypingEffect('BOISE GUN CLUB - EVENT TERMINAL v1.0', 70);
    const { colorScheme } = useTheme();
    const theme = colors[colorScheme];

    return (
        <div className="border-b border-border pb-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <motion.h2
                    className="font-['VT323'] calendar-text-2xl text-accent tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {displayedText}_
                </motion.h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex gap-2">
                        {(['month', 'week', 'list'] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-6 py-3 font-['VT323'] uppercase tracking-wider calendar-text
                                    ${viewMode === mode
                                        ? 'text-accent border border-accent'
                                        : 'text-textSecondary hover:text-accent transition-colors'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}

// Main Calendar component
function CalendarContent() {
    const { viewMode, selectedEvent } = useCalendar();
    const [showScanline, setShowScanline] = useState(true);
    const [scanlinePosition, setScanlinePosition] = useState(0);
    const { colorScheme } = useTheme();
    const theme = colors[colorScheme];

    // Toggle scanline effect periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setShowScanline(prev => !prev);
        }, 16); // 60fps

        return () => clearInterval(interval);
    }, []);
    
    // Update scanline position for deterministic animation
    useEffect(() => {
        const interval = setInterval(() => {
            setScanlinePosition(prev => (prev + 5) % 100);
        }, 100);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="calendar relative min-h-screen bg-background text-text p-4 sm:p-8 mx-auto"
            style={{
                maxWidth: '1600px',
                isolation: 'isolate',
                contain: 'content',
            }}>
            {/* Scanline effect - only in dark mode */}
            {colorScheme === 'dark' && showScanline && (
                <div
                    className="absolute left-0 right-0 h-[2px] bg-accent/10 pointer-events-none"
                    style={{
                        top: `${scanlinePosition}%`,
                        boxShadow: '0 0 10px rgba(255, 176, 0, 0.2)',
                        transition: 'top 0.1s linear'
                    }}
                />
            )}

            {/* CRT screen effect - only in dark mode */}
            {colorScheme === 'dark' && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-50" />
                </div>
            )}

            {/* Main content */}
            <div className="relative z-10">
                <CalendarHeader />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar views */}
                    <div className={`${selectedEvent ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="calendar-text"
                            >
                                {viewMode === 'month' && <MonthView />}
                                {viewMode === 'week' && <WeekView />}
                                {viewMode === 'list' && <EventList />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Event details sidebar */}
                    {selectedEvent && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="lg:col-span-1 calendar-text"
                        >
                            <EventDetail />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Exported Calendar component with providers
export default function Calendar() {
    return (
        <CalendarProvider>
            <CalendarContent />
        </CalendarProvider>
    );
} 
