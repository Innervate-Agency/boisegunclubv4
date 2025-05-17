'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ParticleAnimation = dynamic(() => import('@/components/effects/ParticleAnimation'), { ssr: false });
const SmokeAnimation = dynamic(() => import('@/components/effects/SmokeAnimation'), { ssr: false });

const events = [
    {
        id: 1,
        date: '15',
        month: 'JUL',
        title: 'Summer Steel Challenge',
        desc: 'Fast-paced steel shooting competition. Test your speed and accuracy!',
        attendees: '45+',
        details: 'Join us for our annual Summer Steel Challenge. Multiple stages, prizes for top shooters. All skill levels welcome. Pre-registration recommended.',
        image: '/images/events/steel-challenge.jpg'
    },
    {
        id: 2,
        date: '28',
        month: 'JUL',
        title: 'Trap Shooting Tournament',
        desc: 'Classic trap shooting. 100 targets. Prizes for different classes.',
        attendees: '60+',
        details: 'Our popular Trap Shooting Tournament is back! 100 targets, ATA rules apply. Squads will be formed on the day. Lunch provided.',
        image: '/images/events/trap-shooting.jpg'
    },
    {
        id: 3,
        date: '10',
        month: 'AUG',
        title: 'Defensive Pistol Workshop',
        desc: 'Learn practical defensive shooting skills from certified instructors.',
        attendees: '30 (Full)',
        details: 'This workshop focuses on real-world defensive pistol techniques. Topics include draw stroke, malfunction clearing, shooting from cover, and more. Limited spots, sign up early!',
        image: '/images/events/defensive-pistol.jpg'
    },
    {
        id: 4,
        date: '25',
        month: 'AUG',
        title: 'Youth Marksmanship Day',
        desc: 'Safe and fun introduction to shooting sports for young enthusiasts.',
        attendees: '50+',
        details: 'A great opportunity for young shooters (ages 10-17) to learn about firearm safety and basic marksmanship under the guidance of experienced coaches. .22 rifles and ammunition provided.',
        image: '/images/events/youth-shooting.jpg'
    }
];

const UpcomingEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState(events[0]);

    const handleEventSelect = (event: typeof events[0]) => {
        setSelectedEvent(event);
    };

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundGradientY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    const currentDate = new Date();
    const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Background Elements - Ordered by z-index for clarity */}
            
            {/* Animated Gradient Background (Bottom layer) */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary-darker))', // Updated gradient
                    backgroundSize: '100% 200%', 
                    y: backgroundGradientY,
                    
                }}
            />

            {/* Grid Background (Above gradient) */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    backgroundImage: 'url(/images/Grid/Grid (3).jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'contain',
                    opacity: 0.03,
                }}
            />

            {/* Smoke Animation (Above grid) */}
            <div className="absolute inset-0 z-[2]">
                <SmokeAnimation count={3} seed={123} />
            </div>

            {/* Particle Animation (Above smoke) */}
            <div className="absolute inset-0 z-[3]">
                <ParticleAnimation
                    colors={['#F28705']}
                    count={20}
                    size={1.5}
                    speed={0.3}
                    className="opacity-15"
                />
            </div>

            {/* Orange Glow Orbs (Same layer or above particles) */}
            <div className="absolute inset-0 z-[3]">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F28705]/5 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E85E27]/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            </div>

            {/* Section Header - Left Aligned */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-['Clutch_Block'] text-5xl md:text-6xl uppercase tracking-wider text-white relative inline-block leading-tight"
                    >
                        Upcoming <span className="text-[var(--accent-primary)]">Events</span>
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"></span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 max-w-2xl mt-6 font-body text-lg"
                    >
                        Stay updated with our latest competitions, workshops, and community gatherings. There&apos;s always something happening at the Boise Gun Club!
                    </motion.p>
                </div>

                {/* Event List and Details - Adjusted Column Widths */}
                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Event Details Column (Left on Large Screens) - Now wider */}
                    <motion.div
                        key={selectedEvent.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="lg:col-span-3 lg:sticky lg:top-28 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-8"
                    >
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 shadow-lg">
                            <Image 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title} 
                                layout="fill" 
                                objectFit="cover" 
                                className="transition-transform duration-500 hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white leading-tight">
                                    {selectedEvent.title}
                                </h3>
                            </div>
                        </div>
                        <p className="text-sm text-white/60 mb-1">
                            <span className="font-semibold text-[#F28705]">{selectedEvent.date} {selectedEvent.month}</span> | {selectedEvent.attendees} spots
                        </p>
                        <p className="text-white/80 font-body text-base leading-relaxed mb-6">
                            {selectedEvent.details}
                        </p>
                        <Link href={`/events/${selectedEvent.id}`} className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-heading shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full text-center">
                            <span className="relative z-10">View Details & Register</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </Link>
                    </motion.div>

                    {/* Event List Column (Right on Large Screens) - Now narrower */}
                    <div className="lg:col-span-2">
                        {/* Mini Calendar */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mb-8 p-6 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl text-center"
                        >
                            <h3 className="font-['Refrigerator_Deluxe'] text-3xl text-white">
                                {currentMonthName} <span className="text-[var(--accent-primary)]">{currentYear}</span>
                            </h3>
                            <p className="text-white/60 text-sm mt-2 mb-4 font-body">
                                Check out our full event schedule.
                            </p>
                            <Link 
                                href="/events" 
                                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--accent-primary)] text-[var(--accent-primary)] rounded-md font-heading shadow-md hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 overflow-hidden text-sm"
                            >
                                <span className="relative z-10">View Full Calendar</span>
                                <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                        </motion.div>

                        <div className="space-y-4">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
                                    onClick={() => handleEventSelect(event)}
                                    className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl group
                                        ${selectedEvent.id === event.id 
                                            ? 'bg-gradient-to-r from-[var(--accent-primary)]/90 to-[var(--accent-secondary)]/90 shadow-xl scale-[1.02]' 
                                            : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex flex-col items-center justify-center p-2 rounded-md w-16 h-16 transition-colors duration-300 
                                            ${selectedEvent.id === event.id ? 'bg-white/20' : 'bg-[var(--accent-primary)]/20 group-hover:bg-[var(--accent-primary)]/30'}`}>
                                            <span className={`block font-['Clutch_Block'] text-2xl transition-colors duration-300 ${selectedEvent.id === event.id ? 'text-white' : 'text-[var(--accent-primary)] group-hover:text-white'}`}>{event.date}</span>
                                            <span className={`block text-xs uppercase font-semibold transition-colors duration-300 ${selectedEvent.id === event.id ? 'text-white/80' : 'text-[var(--accent-primary)]/80 group-hover:text-white/90'}`}>{event.month}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold text-lg mb-0.5 transition-colors duration-300 ${selectedEvent.id === event.id ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>{event.title}</h4>
                                            <p className={`text-xs transition-colors duration-300 ${selectedEvent.id === event.id ? 'text-white/70' : 'text-white/60 group-hover:text-white/70'}`}>{event.desc}</p>
                                            <p className={`text-xs mt-1 font-medium transition-colors duration-300 ${selectedEvent.id === event.id ? 'text-yellow-300' : 'text-yellow-400 group-hover:text-yellow-300'}`}>{event.attendees} attending</p>
                                        </div>
                                        <svg className={`w-5 h-5 transition-all duration-300 ${selectedEvent.id === event.id ? 'text-white opacity-100' : 'text-white/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
