'use client';

import { useState, useRef, useCallback, RefObject } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import ClientManager from './components/ClientManager';
import InvoiceDashboard from './components/InvoiceDashboard';
import TemplateSelector from './components/TemplateSelector';
import TabNavigation from './components/helperInvoiceParts/TabNavigation';
import QuickServices from './components/helperInvoiceParts/QuickServices';
import InvoiceActions from './components/helperInvoiceParts/InvoiceActions';
import LivePreview from './components/helperInvoiceParts/LivePreview';
import { useInvoiceNumber } from './hooks/useInvoiceNumber';
import { InvoiceData, Client, ActiveTab, Template } from '@/types/invoice';

const DEFAULT_TAX_RATE = 16;

export default function Home() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('create');
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const invoiceNumber = useInvoiceNumber();

    const updateInvoiceData = useCallback((formData: any) => {
        setInvoiceData({
            ...formData,
            invoiceNumber,
            businessEmail: formData.businessEmail || '',
            businessAddress: formData.businessAddress || '',
            clientEmail: formData.clientEmail || '',
            clientAddress: formData.clientAddress || '',
            taxRate: DEFAULT_TAX_RATE,
            dueDate: formData.dueDate || formData.date,
            notes: formData.notes || '',
            businessLogo: formData.businessLogo || null,
            clientSignature: formData.clientSignature || null
        });
    }, [invoiceNumber]);

    const handleClientSelect = useCallback((client: Client) => {
        setInvoiceData(prev => prev ? {
            ...prev,
            clientName: client.name,
            clientPhone: client.phone,
            clientEmail: client.email,
            clientAddress: client.address
        } : null);
    }, []);

    const handleTemplateChange = useCallback((template: Template) => {
        setSelectedTemplate(template);
        // Template changes will automatically reflect in InvoicePreview through the template prop
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'create':
                return (
                    <div className="space-y-6">
                        <TemplateSelector
                            onTemplateChange={handleTemplateChange}
                            selectedTemplate={selectedTemplate}
                        />
                        <InvoiceForm onDataUpdate={updateInvoiceData} />
                    </div>
                );
            case 'preview':
                return (
                    <div ref={invoiceRef} className="w-full overflow-x-auto">
                        <InvoicePreview
                            data={invoiceData}
                            template={selectedTemplate ? {
                                layout: selectedTemplate.config.layout,
                                primaryColor: selectedTemplate.colors.primary,
                                secondaryColor: selectedTemplate.colors.secondary,
                                backgroundColor: selectedTemplate.colors.background || '#ffffff',
                                textColor: selectedTemplate.colors.text || '#374151',
                                accentColor: selectedTemplate.colors.accent || selectedTemplate.colors.primary,
                                showLogo: selectedTemplate.config.showLogo,
                                showSignature: selectedTemplate.config.showSignature,
                                showTaxBreakdown: selectedTemplate.config.showTaxBreakdown,
                                borderRadius: selectedTemplate.config.borderRadius,
                                spacing: selectedTemplate.config.spacing
                            } : undefined}
                        />
                    </div>
                );
            case 'dashboard':
                return <InvoiceDashboard />;
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <div className="max-w-[95rem] mx-auto px-4 py-8">
                <PageTitle activeTab={activeTab} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form & Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        <ContentCard>
                            <TabNavigation
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            />
                            {renderTabContent()}
                        </ContentCard>

                        {/* Quick Access Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ClientManager onSelectClient={handleClientSelect} />
                            <QuickServices />
                        </div>
                    </div>

                    {/* Right Column - Live Preview & Actions */}
                    <div className="space-y-6">
                        <div className="sticky top-4 space-y-6">
                            <LivePreview
                                invoiceData={invoiceData}
                                template={selectedTemplate}
                                invoiceRef={invoiceRef as RefObject<HTMLDivElement>}
                            />

                            {invoiceData && (
                                <InvoiceActions
                                    invoiceData={invoiceData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Subcomponents for better organization
function PageTitle({ activeTab }: { activeTab: ActiveTab }) {
    const titles = {
        create: 'Invoice Generator',
        preview: 'Invoice Preview',
        dashboard: 'Invoice Dashboard'
    };

    return (
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white mb-2">
            {titles[activeTab]}
        </h1>
    );
}

function ContentCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            {children}
        </div>
    );
}