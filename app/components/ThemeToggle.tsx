// app/components/ThemeToggle.tsx
'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const themes = [
        { value: 'light' as const, label: 'Light', icon: '☀️' },
        { value: 'dark' as const, label: 'Dark', icon: '🌙' },
        { value: 'system' as const, label: 'System', icon: '💻' },
    ];

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        console.log('Theme toggle clicked:', newTheme);
        setTheme(newTheme);

        // Force a re-check of the current theme
        setTimeout(() => {
            const currentClass = document.documentElement.className;
            console.log('Current HTML classes:', currentClass);
        }, 100);
    };

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {themes.map((t) => (
                <button
                    key={t.value}
                    onClick={() => handleThemeChange(t.value)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                        theme === t.value
                            ? 'bg-white dark:bg-gray-700 shadow-sm'
                            : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                    title={t.label}
                >
                    <span className="text-sm">{t.icon}</span>
                </button>
            ))}
        </div>
    );
}