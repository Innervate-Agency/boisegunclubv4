'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCalendar } from './CalendarContext';

function getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
        return new Date(year, month, -i);
    }).reverse();

    // Get all days in current month
    const daysInMonth = Array.from(
        { length: lastDay.getDate() },
        (_, i) => new Date(year, month, i + 1)
    );

    // Get days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    const nextMonthDays = Array.from(
        { length: 6 - lastDayOfWeek },
        (_, i) => new Date(year, month + 1, i + 1)
    );

    return [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
}

const MonthView = () => {
    const { selectedDate, setSelectedDate, events, setSelectedEvent } = useCalendar();
    const [days, setDays] = useState<Date[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDays(getDaysInMonth(selectedDate));
        // Simulate loading for terminal effect
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [selectedDate]);

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        setSelectedDate(newDate);
    };

    if (isLoading) {
        return (
            <div className="font-['VT323'] text-[#FFB000] animate-pulse">
                LOADING CALENDAR DATA...
            </div>
        );
    }

    return (
        <div className="font-['VT323']">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigateMonth('prev')}
                    className="text-[#FFB000] hover:text-[#FFB000]/80 transition-colors"
                >
                    {'<< PREV'}
                </button>
                <h3 className="text-xl">
                    {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={() => navigateMonth('next')}
                    className="text-[#FFB000] hover:text-[#FFB000]/80 transition-colors"
                >
                    {'NEXT >>'}
                </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-px bg-[#FFB000]/20">
                {/* Weekday headers */}
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div
                        key={day}
                        className="p-2 text-center text-[#FFB000] border-b border-[#FFB000]/30"
                    >
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map((date, index) => {
                    const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                    const dayEvents = events.filter(event =>
                        event.start.toDateString() === date.toDateString()
                    );

                    return (
                        <motion.div
                            key={date.toISOString()}
                            className={`
                                min-h-[100px] p-2 border border-[#FFB000]/30
                                ${isCurrentMonth ? 'bg-[#0A3200]' : 'bg-[#0A3200]/50'}
                                hover:bg-[#FFB000]/10 transition-colors cursor-pointer
                            `}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.01 }}
                            onClick={() => dayEvents[0] && setSelectedEvent(dayEvents[0])}
                        >
                            <div className="text-right mb-2">
                                <span className={isCurrentMonth ? 'text-[#FFB000]' : 'text-[#FFB000]/50'}>
                                    {date.getDate()}
                                </span>
                            </div>
                            {dayEvents.map(event => (
                                <div
                                    key={event.id}
                                    className="text-xs mb-1 p-1 bg-[#FFB000]/20 hover:bg-[#FFB000]/30
                                             border border-[#FFB000]/30 cursor-pointer transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                    }}
                                >
                                    {event.title}
                                </div>
                            ))}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;