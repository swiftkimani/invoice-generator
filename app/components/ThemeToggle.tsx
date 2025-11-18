// app/components/ThemeToggle.tsx - Compact Version
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const themes = [
        { value: 'light' as const, label: 'Light', icon: '☀️' },
        { value: 'dark' as const, label: 'Dark', icon: '🌙' },
        { value: 'system' as const, label: 'System', icon: '💻' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentTheme = themes.find(t => t.value === theme) || themes[1];

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Compact Current Theme Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    p-2 rounded-xl 
                    bg-gray-800 hover:bg-gray-700 
                    border border-gray-700 hover:border-gray-600
                    transition-all duration-200
                    cursor-pointer
                    shadow-lg
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={`Theme: ${currentTheme.label}`}
            >
                <span className="text-lg">
                    {currentTheme.icon}
                </span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Compact Dropdown */}
                        <motion.div
                            className="
                                absolute top-full right-0 mt-2 z-50
                                bg-gray-800 border border-gray-700
                                rounded-xl shadow-2xl
                                backdrop-blur-xl
                                min-w-[120px]
                                py-2
                            "
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {themes.map((themeOption) => (
                                <motion.button
                                    key={themeOption.value}
                                    onClick={() => handleThemeChange(themeOption.value)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2
                                        text-left transition-all duration-200
                                        cursor-pointer
                                        ${theme === themeOption.value
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                    }
                                    `}
                                    whileHover={{ x: 4 }}
                                >
                                    <span className="text-lg">
                                        {themeOption.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {themeOption.label}
                                    </span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}