'use client';

import { useState, useEffect, useRef } from 'react';
import { Template, templates } from '@/types/invoice';

interface TemplateSelectorProps {
    onTemplateChange: (template: Template) => void;
    selectedTemplate?: Template | null;
}

export default function TemplateSelector({ onTemplateChange, selectedTemplate }: TemplateSelectorProps) {
    const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Mobile-optimized templates
    const mobileTemplates = templates.filter(t =>
        t.id === 'black-white' || t.id === 'minimal' || t.id === 'modern' || t.id === 'professional'
    );

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Reset index when switching to mobile
            if (mobile && currentIndex >= mobileTemplates.length) {
                setCurrentIndex(0);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Set default template
        if (selectedTemplate) {
            setActiveTemplate(selectedTemplate);
            const index = mobileTemplates.findIndex(t => t.id === selectedTemplate.id);
            if (index !== -1) setCurrentIndex(index);
        } else {
            const defaultTemplate = mobileTemplates[0]; // black-white is first
            setActiveTemplate(defaultTemplate);
            onTemplateChange(defaultTemplate);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle template selection
    const handleTemplateSelect = (template: Template, index: number) => {
        setActiveTemplate(template);
        setCurrentIndex(index);
        onTemplateChange(template);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % mobileTemplates.length;
        setCurrentIndex(nextIndex);
        const nextTemplate = mobileTemplates[nextIndex];
        setActiveTemplate(nextTemplate);
        onTemplateChange(nextTemplate);
    };

    const handlePrevious = () => {
        const prevIndex = currentIndex === 0 ? mobileTemplates.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        const prevTemplate = mobileTemplates[prevIndex];
        setActiveTemplate(prevTemplate);
        onTemplateChange(prevTemplate);
    };

    // Auto-scroll carousel
    useEffect(() => {
        if (carouselRef.current && isMobile) {
            const element = carouselRef.current;
            const scrollAmount = currentIndex * (element.clientWidth + 12); // 12px gap
            element.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    }, [currentIndex, isMobile]);

    // Desktop grid view
    if (!isMobile) {
        return (
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Choose Template
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Select a template to customize your invoice appearance
                        </p>
                    </div>

                    {activeTemplate && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: activeTemplate.colors.primary }}
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {activeTemplate.name}
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {templates.map(template => {
                        const isActive = activeTemplate?.id === template.id;

                        return (
                            <button
                                key={template.id}
                                onClick={() => handleTemplateSelect(template, templates.indexOf(template))}
                                className={`
        relative p-4 border-2 rounded-xl transition-all duration-200 
        hover:scale-105 hover:shadow-lg group min-h-[140px]
        ${isActive
                                    ? 'ring-2 ring-offset-2 ring-opacity-50 transform scale-105 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }
    `}
                                style={{
                                    borderColor: isActive ? template.colors.primary : undefined,
                                    backgroundColor: isActive ? `${template.colors.primary}10` : undefined,
                                    // Remove the ringColor line entirely
                                }}
                            >
                                {isActive && (
                                    <div
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                        style={{ backgroundColor: template.colors.primary }}
                                    >
                                        ✓
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div
                                        className="w-full h-16 rounded-lg shadow-inner overflow-hidden"
                                        style={{
                                            background: template.id === 'black-white'
                                                ? 'linear-gradient(135deg, #f0f0f0, #ffffff)'
                                                : `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.secondary}20)`,
                                            border: template.id === 'black-white'
                                                ? '1px solid #e5e5e5'
                                                : `1px solid ${template.colors.primary}30`
                                        }}
                                    >
                                        <div className="h-full flex items-center justify-center">
                                            <div className="flex gap-1">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.colors.primary }} />
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.colors.secondary }} />
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.colors.accent || template.colors.primary }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <span className={`text-sm font-semibold block ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {template.name}
                                        </span>
                                        <div className="flex justify-center gap-1 mt-1">
                                            {template.config.showLogo && <span className="text-xs text-gray-500 dark:text-gray-400">🖼️</span>}
                                            {template.config.showSignature && <span className="text-xs text-gray-500 dark:text-gray-400">✍️</span>}
                                            {template.config.showTaxBreakdown && <span className="text-xs text-gray-500 dark:text-gray-400">📊</span>}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Mobile carousel view
    return (
        <div className="mb-8">
            {/* Header */}
            <div className="text-center mb-6">
                <label className="block text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Choose Style
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Swipe to browse templates
                </p>
            </div>

            {/* Current Template Display */}
            {activeTemplate && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 mb-4 border border-blue-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg shadow-inner flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${activeTemplate.colors.primary}20, ${activeTemplate.colors.secondary}20)`,
                                    border: `2px solid ${activeTemplate.colors.primary}40`
                                }}
                            >
                                <div className="flex gap-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTemplate.colors.primary }} />
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTemplate.colors.secondary }} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    {activeTemplate.name}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {currentIndex + 1} of {mobileTemplates.length}
                                </p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Selected ✓
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Carousel */}
            <div className="relative">
                <div
                    ref={carouselRef}
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {mobileTemplates.map((template, index) => (
                        <div
                            key={template.id}
                            className="flex-shrink-0 w-4/5 snap-center"
                        >
                            <button
                                onClick={() => handleTemplateSelect(template, index)}
                                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                                    activeTemplate?.id === template.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                }`}
                                style={{
                                    borderColor: activeTemplate?.id === template.id ? template.colors.primary : undefined,
                                }}
                            >
                                {/* Template Preview */}
                                <div
                                    className="w-full h-20 rounded-xl mb-3 flex items-center justify-center"
                                    style={{
                                        background: template.id === 'black-white'
                                            ? 'linear-gradient(135deg, #f8f8f8, #ffffff)'
                                            : `linear-gradient(135deg, ${template.colors.primary}15, ${template.colors.secondary}15)`,
                                        border: `1px solid ${template.colors.primary}20`
                                    }}
                                >
                                    <div className="flex gap-2">
                                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: template.colors.primary }} />
                                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: template.colors.secondary }} />
                                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: template.colors.accent || template.colors.primary }} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span className={`font-bold block text-sm ${
                                        activeTemplate?.id === template.id
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                        {template.name}
                                    </span>
                                    <div className="flex justify-center gap-1 mt-2">
                                        {template.config.showLogo && <span className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">Logo</span>}
                                        {template.config.showSignature && <span className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">Sign</span>}
                                        {template.config.showTaxBreakdown && <span className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">Tax</span>}
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {mobileTemplates.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const template = mobileTemplates[index];
                                handleTemplateSelect(template, index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-blue-500 w-6'
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 shadow-lg rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-600"
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 shadow-lg rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-600"
                >
                    →
                </button>
            </div>

            {/* Swipe Instructions */}
            <div className="text-center mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="animate-bounce">👆</span>
                    <span>Swipe or tap to browse templates</span>
                    <span className="animate-bounce">👆</span>
                </div>
            </div>
        </div>
    );
}

// Hide scrollbar for carousel
const styles = `
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
`;

// Add styles to head
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}