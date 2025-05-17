'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import NavLogo from './NavLogo';
import ThemeToggle from './ThemeToggle';
import { useNavigation } from './NavigationContext';

// Navigation items with updated colors based on brand guidelines
const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'EVENTS', href: '/events' },
    { label: 'RANGES', href: '/gallery' },
    { label: 'MEMBERSHIP', href: '/membership' },
    { label: 'CONTACT', href: '/contact' },
];

// Clean modern navigation item component
const NavItem = ({ label, href, isActive }: {
    label: string;
    href: string;
    isActive: boolean;
}) => {
    return (
        <Link href={href}>
            <motion.div
                className="relative flex items-center cursor-pointer px-2 py-1"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)'
                }}
            >
                <span className={`font-heading text-sm tracking-wide ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
                    {label}
                </span>

                {/* Orange underline on hover */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"
                    initial={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </Link>
    );
};

export default function NavBar() {
    const { isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, clubAnnouncements } = useNavigation();
    const announcementRef = useRef<HTMLDivElement>(null);
    const [currentPath, setCurrentPath] = useState('/');

    // Set current path on component mount
    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    // Intersection observer for announcements section
    useEffect(() => {
        if (!announcementRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === announcementRef.current) {
                        entry.target.classList.toggle('announcement-visible', entry.isIntersecting);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(announcementRef.current);

        return () => {
            if (announcementRef.current) {
                observer.unobserve(announcementRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* Announcements bar */}
            {clubAnnouncements.length > 0 && (
                <div
                    ref={announcementRef}
                    className="hidden lg:block bg-[var(--accent-primary)] text-white py-2 px-4 text-center text-sm fixed top-0 w-full z-50 shadow-md"
                >
                    <div className="container mx-auto overflow-hidden relative">
                        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
                            {clubAnnouncements.map((announcement, index) => (
                                <span key={index} className="mx-4 font-medium font-body">• {announcement}</span>
                            ))}
                            {/* Duplicate announcements to create seamless loop */}
                            {clubAnnouncements.map((announcement, index) => (
                                <span key={`dup-${index}`} className="mx-4 font-medium font-body">• {announcement}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Navigation - Glassmorphic */}
            <nav
                className={`fixed ${clubAnnouncements.length > 0 ? 'top-8 lg:top-10' : 'top-0'} left-0 w-full z-40 transition-all duration-300`}
            >
                <div
                    className={`relative transition-all duration-300 ${isScrolled
                        ? 'py-3 backdrop-blur-md'
                        : 'py-4 bg-gradient-to-b from-[var(--bg-primary)]/50 to-transparent'
                        }`}
                    style={{
                        backgroundColor: isScrolled ? 'var(--bg-secondary)' : 'transparent',
                        borderBottom: isScrolled ? '1px solid var(--accent-primary)' : 'none',
                        boxShadow: isScrolled ? '0 4px 6px var(--shadow-color)' : 'none'
                    }}
                >
                    {/* Subtle grid texture beneath glass */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute inset-0 grid-bg opacity-10" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <NavLogo />

                            {/* Desktop Navigation - Clean Modern */}
                            <div className="hidden lg:flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <NavItem
                                        key={link.href}
                                        href={link.href}
                                        label={link.label}
                                        isActive={currentPath === link.href}
                                    />
                                ))}

                                {/* Theme Toggle */}
                                <ThemeToggle />

                                {/* Member Login Button - Modern Gradient */}
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative"
                                >
                                    <Link
                                        href="/membership"
                                        className="relative btn-gradient block px-6 py-2.5 rounded font-bold shadow-lg font-heading tracking-wide"
                                    >
                                        MEMBER LOGIN
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Mobile Menu Button - Clean design */}
                            <div className="lg:hidden flex items-center space-x-4">
                                <ThemeToggle />

                                <button
                                    className="relative z-10 p-2 text-[var(--text-primary)]"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    <div className="relative w-6 h-5 flex flex-col justify-between">
                                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <MobileMenu
                            links={navLinks}
                            onClose={() => setIsMobileMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </nav>

            {/* Global styles */}
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                .announcement-visible {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
            `}</style>
        </>
    );
} 
