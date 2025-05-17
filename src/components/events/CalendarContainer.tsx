'use client';

import { createContext, useState, useContext } from 'react';
import MonthView from './MonthView';
import EventList from './EventList';
import EventDetail from './EventDetail';

// Context for managing calendar state
const CalendarContext = createContext(null);

const CalendarContainer = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <CalendarContext.Provider value={{ selectedDate, setSelectedDate, viewMode, setViewMode, selectedEvent, setSelectedEvent }}>
            <div className="calendar-container bg-[#0A3200] text-[#FFB000] min-h-screen p-4">
                <MonthView />
                <EventList />
                {selectedEvent && <EventDetail />}
            </div>
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContainer;