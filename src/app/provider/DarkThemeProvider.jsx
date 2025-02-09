'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes"

const ThemeContext = createContext({});

export function DarkThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if user has dark mode preference
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(isDark);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <NextThemesProvider             
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange>
                <div className={darkMode ? 'dark' : ''}>
                    {children}
                </div>
            </NextThemesProvider>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);