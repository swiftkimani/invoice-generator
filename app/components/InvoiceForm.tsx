// app/components/InvoiceForm.tsx
'use client';

import { useState, useEffect } from 'react';

type InvoiceFormData = {
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
    paymentMethod: 'mpesa' | 'cash' | 'bank';
    date: string;
    dueDate: string;
    notes: string;
};

type InvoiceFormProps = {
    onDataUpdate: (data: InvoiceFormData) => void;
};

export default function InvoiceForm({ onDataUpdate }: InvoiceFormProps) {
    const [formData, setFormData] = useState<InvoiceFormData>({
        businessName: '',
        businessPhone: '',
        businessEmail: '',
        businessAddress: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientAddress: '',
        serviceDescription: '',
        amount: '',
        paymentMethod: 'mpesa',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        taxEnabled: false,
        discount: '',
        notes: '',
    });

    // Call the update function whenever form changes
    useEffect(() => {
        onDataUpdate(formData);
    }, [formData, onDataUpdate]);

    const handleChange = (field: keyof InvoiceFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
            {/* Business Information - Enhanced */}
            <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Your Business</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={e => handleChange('businessName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent
                 transition-all outline-none"
                            placeholder="e.g., Juma's Barber Shop"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.businessPhone}
                            onChange={e => handleChange('businessPhone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent
                 transition-all outline-none"
                            placeholder="07XX XXX XXX"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.businessEmail}
                            onChange={e => handleChange('businessEmail', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="business@email.com"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Business Address
                        </label>
                        <textarea
                            value={formData.businessAddress}
                            onChange={e => handleChange('businessAddress', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Your business address..."
                        />
                    </div>
                </div>
            </section>

            {/* Client Details - Enhanced */}
            <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Client Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Name *
                        </label>
                        <input
                            type="text"
                            value={formData.clientName}
                            onChange={e => handleChange('clientName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Client full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.clientPhone}
                            onChange={e => handleChange('clientPhone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="07XX XXX XXX"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Email
                        </label>
                        <input
                            type="email"
                            value={formData.clientEmail}
                            onChange={e => handleChange('clientEmail', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="client@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Address
                        </label>
                        <input
                            type="text"
                            value={formData.clientAddress}
                            onChange={e => handleChange('clientAddress', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Client address"
                        />
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Service Details</h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Service Description *
                        </label>
                        <textarea
                            value={formData.serviceDescription}
                            onChange={e => handleChange('serviceDescription', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Describe the service provided..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Amount (KES) *
                            </label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={e => handleChange('amount', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-orange-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Discount (KES)
                            </label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={e => handleChange('discount', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-orange-500"
                                placeholder="0"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.taxEnabled}
                                    onChange={e => handleChange('taxEnabled', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-400 text-orange-600
                     focus:ring-orange-500 focus:ring-2"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Include 16% VAT
                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment & Date - Enhanced */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Method
                    </label>
                    <select
                        value={formData.paymentMethod}
                        onChange={e => handleChange('paymentMethod', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
               focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="mpesa">M-Pesa</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank Transfer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Invoice Date
                    </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={e => handleChange('date', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
               focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={e => handleChange('dueDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
               focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                </label>
                <textarea
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
             focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Any additional notes or terms..."
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-600
                   text-white font-bold rounded-xl shadow-lg hover:shadow-xl
                   transform hover:scale-105 transition-all duration-200">
                    Generate Invoice
                </button>
                <button className="px-6 py-4 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white
                   font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-white/20
                   transition-all">
                    Save Draft
                </button>
            </div>
        </div>
    );
}