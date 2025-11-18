// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BarChart3, TrendingUp, User, Sun, Moon } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Theme state with system preference + persistence
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved as 'light' | 'dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    // Sticky header on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'History', icon: BarChart3, desc: 'View invoice history' },
        { label: 'Analytics', icon: TrendingUp, desc: 'Business insights' },
        { label: 'My Account', icon: User, desc: 'Manage profile' },
    ];

    return (
        <>
            {/* Header */}
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-white/10'
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-emerald-600 flex items-center justify-center shadow-xl">
                                <span className="text-white font-black text-xl lg:text-2xl">K</span>
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                    Huduma Bill
                                </h1>
                                <p className="hidden sm:block text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                                    Professional Invoices for Kenya
                                </p>
                            </div>
                        </div>

                        {/* Desktop Nav + Theme Toggle */}
                        <div className="hidden lg:flex items-center gap-8">
                            <nav className="flex items-center gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all
                               text-gray-700 dark:text-gray-200
                               hover:bg-gray-100 dark:hover:bg-white/10
                               active:scale-95"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>

                            {/* Theme Toggle - Desktop */}
                            <button
                                onClick={toggleTheme}
                                className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all group"
                            >
                                <motion.div
                                    animate={{ rotate: theme === 'light' ? 180 : 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {theme === 'dark' ? (
                                        <Moon className="w-5 h-5 text-amber-400" />
                                    ) : (
                                        <Sun className="w-5 h-5 text-orange-500" />
                                    )}
                                </motion.div>
                            </button>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex items-center gap-3 lg:hidden">
                            {/* Theme Toggle - Mobile */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                {theme === 'dark' ? (
                                    <Moon className="w-5 h-5 text-amber-400" />
                                ) : (
                                    <Sun className="w-5 h-5 text-orange-500" />
                                )}
                            </button>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu - Now with proper contrast! */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-80 z-50 shadow-2xl
                         bg-white dark:bg-gray-900
                         border-l border-gray-200 dark:border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 pt-8">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h2>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>

                                <nav className="space-y-3">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full flex items-center gap-4 p-5 rounded-2xl text-left
                                 bg-gray-50 dark:bg-white/5
                                 hover:bg-gray-100 dark:hover:bg-white/10
                                 border border-gray-200 dark:border-white/10
                                 transition-all group"
                                        >
                                            <item.icon className="w-9 h-9 text-orange-500 dark:text-emerald-400" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                                    {item.label}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {item.desc}
                                                </div>
                                            </div>
                                            <span className="text-2xl text-gray-400 dark:text-gray-500 group-hover:translate-x-2 transition-transform">
                        →
                      </span>
                                        </button>
                                    ))}
                                </nav>

                                <div className="absolute bottom-8 left-6 right-6 text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        Streamlining Kenyan Business
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer */}
            <div className="h-16 lg:h-20" />
        </>
    );
}