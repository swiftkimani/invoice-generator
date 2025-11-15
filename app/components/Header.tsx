'use client';

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationItems = [
        { label: 'History', href: '#' },
        { label: 'Analytics', href: '#' },
        { label: 'My Account', href: '#' },
    ];

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <span className="text-white font-bold text-lg">₭</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                Huduma Bill
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Professional Invoices for Kenya
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-105 cursor-pointer font-medium">
                            History
                        </button>
                        <button className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-105 cursor-pointer font-medium">
                            Analytics
                        </button>
                        <button className="btn-primary cursor-pointer hover:scale-105 transition-transform duration-300">
                            My Account
                        </button>

                        {/* Theme Toggle */}
                        <div className="ml-4">
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        {/* Theme Toggle for Mobile */}
                        <ThemeToggle />

                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                                <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <nav className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex flex-col space-y-4">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:translate-x-2 cursor-pointer py-2 px-4 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 font-medium text-left"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Backdrop for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    );
}