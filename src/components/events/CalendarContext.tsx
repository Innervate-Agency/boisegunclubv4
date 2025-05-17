'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ViewMode = 'month' | 'week' | 'list';
type EventCategory = 'competition' | 'training' | 'social' | 'maintenance';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    location: string;
    category: EventCategory;
    registrationStatus: 'open' | 'closed' | 'waitlist';
    maxParticipants?: number;
    currentParticipants?: number;
}

interface CalendarContextType {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    selectedEvent: CalendarEvent | null;
    setSelectedEvent: (event: CalendarEvent | null) => void;
    events: CalendarEvent[];
    addEvent: (event: CalendarEvent) => void;
    removeEvent: (eventId: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Sample events data
const sampleEvents: CalendarEvent[] = [
    {
        id: '1',
        title: 'Annual Turkey Shoot Competition',
        start: new Date(2024, 6, 15, 9, 0),
        end: new Date(2024, 6, 15, 17, 0),
        description: 'Join us for our traditional Turkey Shoot! Multiple categories including Trap, Skeet, and 5-Stand. Cash prizes and frozen turkeys for winners. Lunch provided for all participants.',
        location: 'Main Range',
        category: 'competition',
        registrationStatus: 'open',
        maxParticipants: 50,
        currentParticipants: 32
    },
    {
        id: '2',
        title: 'Beginner Shotgun Safety Course',
        start: new Date(2024, 6, 20, 10, 0),
        end: new Date(2024, 6, 20, 15, 0),
        description: 'Comprehensive safety course for new shooters. Covers firearm safety, range rules, and basic shooting techniques. All equipment provided. Perfect for first-time shooters!',
        location: 'Training Range',
        category: 'training',
        registrationStatus: 'open',
        maxParticipants: 20,
        currentParticipants: 15
    },
    {
        id: '3',
        title: 'Monthly Club Meeting & Potluck',
        start: new Date(2024, 6, 25, 18, 0),
        end: new Date(2024, 6, 25, 20, 0),
        description: 'Monthly meeting to discuss club business, upcoming events, and share a meal together. Bring your favorite dish! Special presentation on reloading basics.',
        location: 'Clubhouse',
        category: 'social',
        registrationStatus: 'open',
        maxParticipants: 100,
        currentParticipants: 45
    },
    {
        id: '4',
        title: 'Range Maintenance Day',
        start: new Date(2024, 7, 1, 8, 0),
        end: new Date(2024, 7, 1, 12, 0),
        description: 'Help maintain our beautiful range! Tasks include trap machine maintenance, target replacement, and general cleanup. Lunch provided for volunteers.',
        location: 'All Ranges',
        category: 'maintenance',
        registrationStatus: 'open',
        maxParticipants: 30,
        currentParticipants: 12
    },
    {
        id: '5',
        title: 'Senior Shooters Morning',
        start: new Date(2024, 7, 5, 9, 0),
        end: new Date(2024, 7, 5, 12, 0),
        description: 'Special morning session for our senior members. Reduced rates, coffee and donuts provided. Extra range officers on duty for assistance.',
        location: 'Skeet Range',
        category: 'social',
        registrationStatus: 'open',
        maxParticipants: 40,
        currentParticipants: 28
    },
    {
        id: '6',
        title: 'Youth Shooting Program',
        start: new Date(2024, 7, 8, 13, 0),
        end: new Date(2024, 7, 8, 16, 0),
        description: 'Introduction to shooting sports for ages 12-18. Safety instruction, basic techniques, and supervised practice. All equipment provided. Parent/guardian must be present.',
        location: 'Training Range',
        category: 'training',
        registrationStatus: 'waitlist',
        maxParticipants: 15,
        currentParticipants: 15
    },
    {
        id: '7',
        title: 'Summer Night Shoot',
        start: new Date(2024, 7, 12, 19, 0),
        end: new Date(2024, 7, 12, 22, 0),
        description: 'Special evening shooting event under the lights! Experience trap shooting in a whole new way. Glow targets and refreshments provided.',
        location: 'Trap Range',
        category: 'competition',
        registrationStatus: 'open',
        maxParticipants: 45,
        currentParticipants: 20
    },
    {
        id: '8',
        title: 'Advanced Trap Techniques Workshop',
        start: new Date(2024, 7, 15, 10, 0),
        end: new Date(2024, 7, 15, 16, 0),
        description: 'Advanced workshop covering doubles, handicap, and international trap. For experienced shooters looking to improve their scores. Includes video analysis.',
        location: 'Main Range',
        category: 'training',
        registrationStatus: 'closed',
        maxParticipants: 12,
        currentParticipants: 12
    }
];

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedViewMode = localStorage.getItem('calendarViewMode');
        if (savedViewMode) {
            setViewMode(savedViewMode as ViewMode);
        }
    }, []);

    // Save preferences to localStorage when they change
    useEffect(() => {
        localStorage.setItem('calendarViewMode', viewMode);
    }, [viewMode]);

    const addEvent = (event: CalendarEvent) => {
        setEvents(prev => [...prev, event]);
    };

    const removeEvent = (eventId: string) => {
        setEvents(prev => prev.filter(event => event.id !== eventId));
    };

    return (
        <CalendarContext.Provider
            value={{
                selectedDate,
                setSelectedDate,
                viewMode,
                setViewMode,
                selectedEvent,
                setSelectedEvent,
                events,
                addEvent,
                removeEvent
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
} 