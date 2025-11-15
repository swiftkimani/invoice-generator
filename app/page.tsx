'use client';

import { useState } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
// import InvoicePreview from '@/components/InvoicePreview';
// import ServiceCatalog from '@/components/ServiceCatalog';
// import ClientManager from '@/components/ClientManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'preview'>('create');
  const [invoiceData, setInvoiceData] = useState(null);

  return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
        <Header />

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                      className={`px-4 py-2 font-semibold ${
                          activeTab === 'create'
                              ? 'text-orange-600 border-b-2 border-orange-600'
                              : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('create')}
                  >
                    Create Invoice
                  </button>
                  <button
                      className={`px-4 py-2 font-semibold ${
                          activeTab === 'preview'
                              ? 'text-orange-600 border-b-2 border-orange-600'
                              : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('preview')}
                  >
                    Preview
                  </button>
                </div>

                {activeTab === 'create' ? (
                    <InvoiceForm onDataUpdate={setInvoiceData} />
                ) : ( "null"
                    // <InvoicePreview data={invoiceData} />
                )}
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*<ServiceCatalog />*/}
                {/*<ClientManager />*/}
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Live Preview
                </h3>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 min-h-[500px]">
                  {/* Invoice preview will be rendered here */}
                  <div className="text-center text-gray-500 py-20">
                    Your invoice will appear here as you type
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}