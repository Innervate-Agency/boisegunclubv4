'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Badge from '../ui/Badge';
import { formatEventDate, getRelativeEventTime } from '../../utils/dateUtils';

// Updated event structure with ISO dates and more info
const events = [
    {
        id: 1,
        date: "2023-06-15",
        title: "Annual Trap Shooting Competition",
        desc: "Join us for the biggest event of the year! Compete in various categories and win amazing prizes.",
        link: "/events/annual-trap-competition",
        attendees: 127,
        isFeatured: true,
        registrationOpen: true,
    },
    {
        id: 2,
        date: "2023-06-20",
        title: "Beginner Shotgun Safety Course",
        desc: "Learn safe handling, proper techniques, basic shooting techniques. All equipment provided.",
        link: "/events/safety-course",
        attendees: 45,
        isFeatured: false,
        registrationOpen: true,
    },
    {
        id: 3,
        date: "2023-07-25",
        title: "Monthly Club Meeting & Potluck",
        desc: "Monthly meeting for all members, upcoming events, and share a meal together with your favorite dish!",
        link: "/events/monthly-meeting",
        attendees: 89,
        isFeatured: false,
        registrationOpen: true,
    },
    {
        id: 4,
        date: "2023-08-10",
        title: "Women's Shooting Workshop",
        desc: "Designed specifically for women shooters, this workshop covers advanced techniques and networking.",
        link: "/events/womens-workshop",
        attendees: 32,
        isFeatured: true,
        registrationOpen: false,
    }
];

const UpcomingEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState(events[0]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    // Get event date components
    const eventDate = new Date(selectedEvent.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const relativeTime = getRelativeEventTime(selectedEvent.date);

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Section Header - Centered */}
            <div className="text-center mb-20">
                <h2 className="font-['Refrigerator_Deluxe'] text-5xl text-white mb-4">
                    UPCOMING EVENTS
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto px-6">
                    Join our most exciting upcoming events at the Boise Gun Club
                </p>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Left Column - 60% - CTA and Info */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Current Event Highlight */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#F28705]/20 rounded-lg p-8"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#F28705] to-[#E85E27] rounded-lg flex flex-col items-center justify-center text-white relative">
                                        <span className="text-2xl font-bold">{day}</span>
                                        <span className="text-xs uppercase">{month}</span>
                                        
                                        {/* Show relative time indicator */}
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                                            <Badge size="sm" variant="gold" animate={true}>
                                                {relativeTime}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {selectedEvent.isFeatured && (
                                            <Badge variant="primary" size="sm">Featured</Badge>
                                        )}
                                        {selectedEvent.registrationOpen ? (
                                            <Badge variant="success" size="sm">Registration Open</Badge>
                                        ) : (
                                            <Badge variant="danger" size="sm">Coming Soon</Badge>
                                        )}
                                    </div>
                                    
                                    <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white mb-2">
                                        {selectedEvent.title}
                                    </h3>
                                    <p className="text-white/70 mb-4">{selectedEvent.desc}</p>
                                    
                                    <div className="flex items-center text-sm text-white/50 mb-4">
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {selectedEvent.attendees} Attending
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatEventDate(selectedEvent.date)}
                                        </span>
                                    </div>
                                    
                                    <Link href={selectedEvent.link} className="inline-block px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] transition-colors text-white rounded font-['Refrigerator_Deluxe'] text-sm">
                                        REGISTER NOW
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Event Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {events.map((event) => (
                                <motion.div 
                                    key={event.id}
                                    className={`p-4 rounded-lg cursor-pointer border border-white/10 transition-all ${selectedEvent.id === event.id ? 'bg-[#F28705]/10 border-[#F28705]/30' : 'bg-[#1a1a1a]/50 hover:bg-[#1a1a1a]'}`}
                                    onClick={() => setSelectedEvent(event)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 flex-shrink-0 bg-black/60 rounded flex flex-col items-center justify-center text-white">
                                            <span className="text-sm font-bold">{new Date(event.date).getDate()}</span>
                                            <span className="text-xs">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-medium line-clamp-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-white/50 text-xs">{getRelativeEventTime(event.date)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - 40% - Registration Form */}
                    <div className="lg:col-span-2">
                        <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-lg shadow-xl">
                            <h3 className="font-['Refrigerator_Deluxe'] text-xl text-white mb-4">
                                Register for an Event
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2" htmlFor="name">Your Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="w-full bg-black/40 text-white border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F28705]/50 focus:border-transparent"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2" htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="w-full bg-black/40 text-white border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F28705]/50 focus:border-transparent"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2" htmlFor="phone">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            className="w-full bg-black/40 text-white border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F28705]/50 focus:border-transparent"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2" htmlFor="event">Select Event</label>
                                        <select
                                            id="event"
                                            name="event"
                                            className="w-full bg-black/40 text-white border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F28705]/50 focus:border-transparent"
                                            value={formData.event}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select an event...</option>
                                            {events.map(event => (
                                                <option key={event.id} value={event.id}>
                                                    {event.title} - {formatEventDate(event.date, false)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#F28705] to-[#E85E27] text-white font-bold py-3 px-4 rounded hover:from-[#E85E27] hover:to-[#F28705] transition-all duration-300"
                                    >
                                        REGISTER NOW
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
