'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendar } from './CalendarContext';

const EventList = () => {
    const { events, setSelectedEvent } = useCalendar();
    const [filter, setFilter] = useState<string>('all');

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

    // Filter events
    const filteredEvents = sortedEvents.filter(event => {
        if (filter === 'all') return true;
        return event.category === filter;
    });

    const formatDate = (date: Date) => {
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="font-['VT323']">
            {/* Filter controls */}
            <div className="mb-6 flex flex-wrap gap-4">
                {['all', 'competition', 'training', 'social', 'maintenance'].map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`
                            px-4 py-2 border transition-colors uppercase tracking-wider
                            ${filter === category
                                ? 'border-[#FFB000] text-[#FFB000] bg-[#FFB000]/10'
                                : 'border-[#FFB000]/30 text-[#FFB000]/70 hover:border-[#FFB000]/60'
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Events list */}
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {filteredEvents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[#FFB000]/70 text-center py-8"
                        >
                            NO EVENTS FOUND IN DATABASE_
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="border border-[#FFB000]/30 bg-[#0A3200] p-4 cursor-pointer
                                             hover:bg-[#FFB000]/5 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    {/* Event header */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl text-[#FFB000]">{event.title}</h3>
                                            <div className="text-[#FFB000]/70">
                                                {formatDate(event.start)}
                                            </div>
                                        </div>
                                        <div className={`
                                            px-2 py-1 text-sm
                                            ${event.registrationStatus === 'open' ? 'text-green-500' :
                                                event.registrationStatus === 'waitlist' ? 'text-yellow-500' :
                                                    'text-red-500'
                                            }
                                        `}>
                                            [{event.registrationStatus.toUpperCase()}]
                                        </div>
                                    </div>

                                    {/* Event details */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-[#FFB000]/70">LOCATION: </span>
                                            <span className="text-[#FFB000]">{event.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-[#FFB000]/70">CATEGORY: </span>
                                            <span className="text-[#FFB000]">
                                                {event.category.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Capacity bar */}
                                    {event.maxParticipants && (
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between text-xs text-[#FFB000]/70 mb-1">
                                                <span>CAPACITY</span>
                                                <span>
                                                    {event.currentParticipants}/{event.maxParticipants}
                                                </span>
                                            </div>
                                            <div className="h-1 bg-[#FFB000]/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-[#FFB000]"
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${(event.currentParticipants! / event.maxParticipants) * 100}%`
                                                    }}
                                                    transition={{ duration: 1 }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Terminal decoration */}
                                    <div className="mt-3 text-xs text-[#FFB000]/50">
                                        {'>'} Click for more details_
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EventList;