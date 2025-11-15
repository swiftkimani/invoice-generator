'use client';

import { useState, useEffect } from 'react';

export default function InvoiceForm({ onDataUpdate }: { onDataUpdate: (data: any) => void }) {
    const [formData, setFormData] = useState({
        businessName: '',
        businessPhone: '',
        clientName: '',
        clientPhone: '',
        serviceDescription: '',
        amount: '',
        paymentMethod: 'mpesa',
        date: new Date().toISOString().split('T')[0],
        taxEnabled: false,
        discount: '',
    });

    useEffect(() => {
        onDataUpdate(formData);
    }, [formData, onDataUpdate]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Business Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Business</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            className="input-field"
                            placeholder="e.g., Juma's Barber Shop"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.businessPhone}
                            onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                            className="input-field"
                            placeholder="07XX XXX XXX"
                        />
                    </div>
                </div>
            </div>

            {/* Client Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Name *
                        </label>
                        <input
                            type="text"
                            value={formData.clientName}
                            onChange={(e) => handleInputChange('clientName', e.target.value)}
                            className="input-field"
                            placeholder="Client full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.clientPhone}
                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                            className="input-field"
                            placeholder="07XX XXX XXX"
                        />
                    </div>
                </div>
            </div>

            {/* Service Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Description *
                        </label>
                        <textarea
                            value={formData.serviceDescription}
                            onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                            rows={3}
                            className="input-field"
                            placeholder="Describe the service provided..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount (KES) *
                            </label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                className="input-field"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount
                            </label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => handleInputChange('discount', e.target.value)}
                                className="input-field"
                                placeholder="0"
                            />
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.taxEnabled}
                                    onChange={(e) => handleInputChange('taxEnabled', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="text-sm text-gray-700">Include 16% VAT</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <select
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="input-field"
                    >
                        <option value="mpesa">M-Pesa</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank Transfer</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
                <button className="btn-primary flex-1">
                    Generate Invoice
                </button>
                <button className="btn-secondary">
                    Save Draft
                </button>
            </div>
        </div>
    );
}