// app/contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved) {
            setTheme(saved);
        }
    }, []);

    useEffect(() => {
        const applyTheme = (t: Theme) => {
            const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            document.documentElement.classList.toggle('dark', isDark);
        };

        applyTheme(theme);

        if (theme === 'system') {
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (e: MediaQueryListEvent) => document.documentElement.classList.toggle('dark', e.matches);
            media.addEventListener('change', handler);
            return () => media.removeEventListener('change', handler);
        }
    }, [theme]);

    const setAndSaveTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setAndSaveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);