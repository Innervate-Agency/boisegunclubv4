'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our navigation context
type NavigationContextType = {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
    isUserAuthenticated: boolean;
    clubAnnouncements: string[];
};

// Create context with default values
const NavigationContext = createContext<NavigationContextType>({
    isScrolled: false,
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: () => { },
    isUserAuthenticated: false,
    clubAnnouncements: [],
});

// Custom hook to use the navigation context
export const useNavigation = () => useContext(NavigationContext);

// Provider component
export function NavigationProvider({ children }: { children: ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // This would be connected to your authentication system
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    // Sample announcements - in a real app, these would come from an API or CMS
    const [clubAnnouncements] = useState([
        'Annual membership renewal begins next month',
        'New range safety protocols in effect',
        'Join us for the Summer Shooting Competition on July 15th'
    ]);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside or on route change
    useEffect(() => {
        const handleRouteChange = () => {
            setIsMobileMenuOpen(false);
        };

        // Mock router event - in real app, use Next.js router events
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return (
        <NavigationContext.Provider
            value={{
                isScrolled,
                isMobileMenuOpen,
                setIsMobileMenuOpen,
                isUserAuthenticated,
                clubAnnouncements,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
} 