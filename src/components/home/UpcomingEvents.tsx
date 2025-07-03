'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';

// Real events with authentic content
const upcomingEvents = [
    {
        id: 1,
        date: '15',
        month: 'DEC',
        title: 'Winter Turkey Shoot Classic',
        desc: 'Traditional turkey shoot competition. Best score takes home the bird.',
        attendees: '85',
        details: 'Join us for our annual Winter Turkey Shoot. 50 targets, Lewis Class scoring. Entry includes lunch and a chance at door prizes. Frozen turkeys for class winners!',
        time: '9:00 AM - 3:00 PM',
        location: 'Trap Fields 1-5',
        image: '/images/events.webp',
        category: 'Competition'
    },
    {
        id: 2,
        date: '22',
        month: 'DEC',
        title: 'Members-Only Poker Shoot',
        desc: 'Five stands, five cards. Best poker hand wins the pot.',
        attendees: '60',
        details: 'Our famous poker shoot is back! $20 buy-in, re-buys allowed. Shoot five stations, draw a card at each. High hand takes 60% of the pot, second place 30%, third 10%.',
        time: '1:00 PM - 5:00 PM',
        location: 'Skeet Fields',
        image: '/images/training.webp',
        category: 'Fun Shoot'
    },
    {
        id: 3,
        date: '05',
        month: 'JAN',
        title: 'New Year Sporting Clays',
        desc: 'Start 2024 right with 100 targets on our sporting clays course.',
        attendees: '120',
        details: 'Kick off the new year with our challenging sporting clays course. 100 targets across 15 stations. Hot coffee and donuts provided. Squads start every 30 minutes.',
        time: '8:00 AM - 2:00 PM',
        location: 'Sporting Clays Course',
        image: '/images/membership.webp',
        category: 'Competition'
    },
    {
        id: 4,
        date: '12',
        month: 'JAN',
        title: 'Introduction to Trap Clinic',
        desc: 'New to trap shooting? Learn the basics from certified instructors.',
        attendees: '25',
        details: 'Perfect for beginners! Learn safety, etiquette, and technique. Includes gun rental, ammunition, and one-on-one instruction. Limited to 25 participants.',
        time: '10:00 AM - 12:00 PM',
        location: 'Training Range',
        image: '/images/hero-bg.webp',
        category: 'Training'
    }
];

const UpcomingEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState(upcomingEvents[0]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="section-spacing bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--accent-primary-rgb),0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
            
            <div className="container-custom relative z-10">
                {/* Enhanced Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-[var(--space-3xl)]"
                >
                    <h2 className="font-['Rajdhani'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[var(--text-primary)] mb-[var(--space-lg)] leading-none">
                        Upcoming <span className="text-[var(--accent-primary)] retro-glow">Events</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg sm:text-xl md:text-2xl font-['Noto Sans'] max-w-3xl mx-auto leading-relaxed">
                        From competitive shoots to casual fun days, there's always action at the club.
                    </p>
                </motion.div>

                {/* Modern Events Grid Layout */}
                <div className="grid lg:grid-cols-5 gap-[var(--space-xl)]">
                    {/* Event Cards List - Left Side */}
                    <div className="lg:col-span-2 space-y-[var(--space-lg)]">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-[var(--space-md)]"
                        >
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    variants={cardVariants}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`group cursor-pointer transition-all duration-300 ${
                                        selectedEvent?.id === event.id 
                                            ? 'scale-[1.02]' 
                                            : 'hover:scale-[1.01]'
                                    }`}
                                >
                                    <div className={`card-modern relative overflow-hidden ${
                                        selectedEvent?.id === event.id
                                            ? 'border-[var(--accent-primary)]/30 glow-subtle'
                                            : 'border-[var(--text-primary)]/5 hover:border-[var(--accent-primary)]/20'
                                    }`}>
                                        {/* Active Indicator */}
                                        {selectedEvent?.id === event.id && (
                                            <motion.div 
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                                                layoutId="activeIndicator"
                                            />
                                        )}
                                        
                                        <div className="p-[var(--space-lg)]">
                                            <div className="flex items-start gap-[var(--space-md)]">
                                                {/* Enhanced Date Block */}
                                                <div className={`flex flex-col items-center justify-center rounded-xl w-16 h-16 transition-all duration-300 ${
                                                    selectedEvent?.id === event.id
                                                        ? 'bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/30'
                                                        : 'bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 group-hover:border-[var(--accent-primary)]/20'
                                                }`}>
                                                    <span className="font-['Rajdhani'] text-xl font-bold text-[var(--text-primary)]">{event.date}</span>
                                                    <span className="text-xs text-[var(--text-secondary)] uppercase font-['Noto Sans']">{event.month}</span>
                                                </div>
                                                
                                                {/* Enhanced Event Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-[var(--space-sm)]">
                                                        <h4 className="font-['Rajdhani'] text-lg font-bold text-[var(--text-primary)] uppercase">{event.title}</h4>
                                                        <span className={`px-[var(--space-sm)] py-1 rounded-full text-xs font-['Noto Sans'] whitespace-nowrap ml-2 ${
                                                            event.category === 'Competition' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            event.category === 'Fun Shoot' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        }`}>
                                                            {event.category}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-sm text-[var(--text-secondary)] font-['Noto Sans'] line-clamp-2 leading-relaxed mb-[var(--space-md)]">
                                                        {event.desc}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-[var(--space-sm)]">
                                                            <UsersIcon className="w-4 h-4 text-[var(--accent-primary)]" />
                                                            <span className="text-xs text-[var(--text-secondary)] font-['Noto Sans']">
                                                                {event.attendees} attending
                                                            </span>
                                                        </div>
                                                        <motion.div
                                                            className="text-xs text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors font-['Rajdhani'] uppercase tracking-wider"
                                                            whileHover={{ x: 4 }}
                                                        >
                                                            View Details →
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        
                        {/* Enhanced View All Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-[var(--space-lg)]"
                        >
                            <Link
                                href="/events"
                                className="btn-secondary-modern w-full text-center"
                            >
                                View Full Calendar
                            </Link>
                        </motion.div>
                    </div>

                    {/* Enhanced Selected Event Details - Right Side */}
                    <div className="lg:col-span-3">
                        {selectedEvent && (
                            <motion.div
                                key={selectedEvent.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="sticky top-24"
                            >
                                <div className="card-elevated glass-mica overflow-hidden">
                                    {/* Enhanced Event Image */}
                                    <div className="relative h-72 sm:h-96">
                                        <Image
                                            src={selectedEvent.image}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                            priority={selectedEvent.id === upcomingEvents[0].id}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                        
                                        {/* Enhanced Title Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-[var(--space-xl)]">
                                            <h3 className="font-['Rajdhani'] text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-[var(--space-sm)] leading-none">
                                                {selectedEvent.title}
                                            </h3>
                                            <p className="text-gray-300 font-['Noto Sans'] text-lg">
                                                {selectedEvent.desc}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Event Details */}
                                    <div className="p-[var(--space-xl)]">
                                        {/* Modern Meta Info Cards */}
                                        <div className="grid sm:grid-cols-3 gap-[var(--space-lg)] mb-[var(--space-xl)]">
                                            <div className="card-modern p-[var(--space-lg)] text-center">
                                                <CalendarDaysIcon className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-[var(--space-sm)]" />
                                                <p className="text-xs text-[var(--text-secondary)] font-['Noto Sans'] uppercase tracking-wider mb-1">Date</p>
                                                <p className="text-[var(--text-primary)] font-['Rajdhani'] text-lg font-bold">{selectedEvent.date} {selectedEvent.month}</p>
                                            </div>
                                            <div className="card-modern p-[var(--space-lg)] text-center">
                                                <ClockIcon className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-[var(--space-sm)]" />
                                                <p className="text-xs text-[var(--text-secondary)] font-['Noto Sans'] uppercase tracking-wider mb-1">Time</p>
                                                <p className="text-[var(--text-primary)] font-['Rajdhani'] text-lg font-bold">{selectedEvent.time}</p>
                                            </div>
                                            <div className="card-modern p-[var(--space-lg)] text-center">
                                                <MapPinIcon className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-[var(--space-sm)]" />
                                                <p className="text-xs text-[var(--text-secondary)] font-['Noto Sans'] uppercase tracking-wider mb-1">Location</p>
                                                <p className="text-[var(--text-primary)] font-['Rajdhani'] text-lg font-bold">{selectedEvent.location}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Enhanced Description */}
                                        <div className="mb-[var(--space-xl)]">
                                            <h4 className="font-['Rajdhani'] text-xl font-bold text-[var(--text-primary)] uppercase mb-[var(--space-md)]">Event Details</h4>
                                            <p className="text-[var(--text-secondary)] font-['Noto Sans'] leading-relaxed text-lg">
                                                {selectedEvent.details}
                                            </p>
                                        </div>
                                        
                                        {/* Modern CTA Button */}
                                        <Link
                                            href={`/events/${selectedEvent.id}`}
                                            className="btn-primary-modern glow-button w-full text-center"
                                        >
                                            <span className="relative z-10">Register for Event</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
