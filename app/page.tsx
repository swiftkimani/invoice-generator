// app/page.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import ClientManager from './components/ClientManager';
import PDFExportButton from './components/PDFExportButton';
import InvoiceDashboard from './components/InvoiceDashboard';
import TemplateSelector from './components/TemplateSelector';
import PaymentStatus from './components/PaymentStatus';
import { useInvoiceNumber } from './hooks/useInvoiceNumber';

type InvoiceData = {
  invoiceNumber: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  serviceDescription: string;
  amount: string;
  discount: string;
  taxEnabled: boolean;
  taxRate: number;
  paymentMethod: 'mpesa' | 'cash' | 'bank';
  date: string;
  dueDate: string;
  notes: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'preview' | 'dashboard'>('create');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const invoiceNumber = useInvoiceNumber();

  // Fixed: useCallback to prevent infinite re-renders
  const updateInvoiceData = useCallback((data: any) => {
    setInvoiceData({
      ...data,
      invoiceNumber,
      businessEmail: data.businessEmail || '',
      businessAddress: data.businessAddress || '',
      clientEmail: data.clientEmail || '',
      clientAddress: data.clientAddress || '',
      taxRate: 16,
      dueDate: data.dueDate || data.date,
      notes: data.notes || ''
    });
  }, [invoiceNumber]); // Add dependencies that change

  const handleClientSelect = useCallback((client: any) => {
    setInvoiceData(prev => prev ? {
      ...prev,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email,
      clientAddress: client.address
    } : null);
  }, []);

  return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Dashboard Stats */}
          {activeTab === 'dashboard' && <InvoiceDashboard />}

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form & Controls */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button
                      className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                          activeTab === 'create'
                              ? 'text-orange-400 border-b-2 border-orange-400'
                              : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('create')}
                  >
                    Create Invoice
                  </button>
                  <button
                      className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                          activeTab === 'preview'
                              ? 'text-orange-400 border-b-2 border-orange-400'
                              : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('preview')}
                  >
                    Preview
                  </button>
                  <button
                      className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                          activeTab === 'dashboard'
                              ? 'text-orange-400 border-b-2 border-orange-400'
                              : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('dashboard')}
                  >
                    Dashboard
                  </button>
                </div>

                {activeTab === 'create' ? (
                    <div className="space-y-6">
                      <TemplateSelector onTemplateChange={setSelectedTemplate} />
                      <InvoiceForm onDataUpdate={updateInvoiceData} />
                    </div>
                ) : activeTab === 'preview' ? (
                    <div ref={invoiceRef}>
                      <InvoicePreview data={invoiceData} template={selectedTemplate} />
                    </div>
                ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        Dashboard content will appear here
                      </p>
                    </div>
                )}
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ClientManager onSelectClient={handleClientSelect} />

                {/* Service Catalog Component */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Services
                  </h3>
                  <div className="space-y-2">
                    {['Haircut', 'Manicure', 'Consultation', 'Repair'].map(service => (
                        <button
                            key={service}
                            className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {service}
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Live Preview & Actions */}
            <div className="space-y-6">
              <div className="sticky top-4 space-y-6">
                {/* Live Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Live Preview
                    </h3>
                    {invoiceData && <PDFExportButton invoiceRef={invoiceRef} />}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[500px] overflow-auto">
                    {invoiceData ? (
                        <InvoicePreview data={invoiceData} template={selectedTemplate} />
                    ) : (
                        <div className="text-center text-gray-400 py-20">
                          Your invoice will appear here as you type
                        </div>
                    )}
                  </div>
                </div>

                {/* Payment Status & Actions */}
                {invoiceData && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Invoice Actions
                      </h3>

                      <PaymentStatus
                          invoiceNumber={invoiceData.invoiceNumber}
                          amount={Number(invoiceData.amount)}
                      />

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Send to Client
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Save Draft
                        </button>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}