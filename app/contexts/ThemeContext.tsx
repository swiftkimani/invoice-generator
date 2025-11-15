// app/contexts/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize theme after component mounts
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) {
            setThemeState(saved);
        } else {
            // Check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    // Apply theme changes
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        let actualTheme: ResolvedTheme = 'light';

        if (theme === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            actualTheme = theme;
        }

        // Remove all theme classes
        root.classList.remove('light', 'dark');
        // Add current theme class
        root.classList.add(actualTheme);

        setResolvedTheme(actualTheme);
        localStorage.setItem('theme', theme);

        console.log('Theme applied:', { theme, actualTheme }); // Debug log
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        console.log('Setting theme to:', newTheme); // Debug log
        setThemeState(newTheme);
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: 'light', resolvedTheme: 'light', setTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Return default theme instead of throwing
        return {
            theme: 'light' as Theme,
            resolvedTheme: 'light' as ResolvedTheme,
            setTheme: () => {}
        };
    }
    return context;
}