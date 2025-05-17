'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isSystemTheme: boolean;
    setSystemTheme: (useSystem: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark'); // Default to dark
    const [isSystemTheme, setIsSystemTheme] = useState(false); // Default to not following system preference

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        // Check if theme preference exists in localStorage
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const savedIsSystem = localStorage.getItem('isSystemTheme');

        const useSystem = savedIsSystem ? savedIsSystem === 'true' : false;
        setIsSystemTheme(useSystem);

        if (useSystem) {
            // Use system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(systemTheme);
            document.documentElement.setAttribute('data-theme', systemTheme);
        } else if (savedTheme) {
        // Use saved preference
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default to dark theme
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            if (isSystemTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                setTheme(newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        };

        // Add event listener for theme changes
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            // For older browsers
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, [isSystemTheme]);

    // Toggle between light and dark mode
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setIsSystemTheme(false);

        // Update localStorage
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('isSystemTheme', 'false');

        // Update document attribute for CSS to detect
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Set to follow system theme
    const setSystemTheme = (useSystem: boolean) => {
        setIsSystemTheme(useSystem);
        localStorage.setItem('isSystemTheme', useSystem.toString());

        if (useSystem) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(systemTheme);
            document.documentElement.setAttribute('data-theme', systemTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme, setSystemTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 