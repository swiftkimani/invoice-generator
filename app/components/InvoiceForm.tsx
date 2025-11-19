'use client';

import { useState, useEffect, useCallback } from 'react';
import BusinessInfoSection from '@/app/components/mainInvoice/BusinessInfoSection';
import ClientDetailsSection from '@/app/components/mainInvoice/ClientDetailsSection';
import ServiceDetailsSection from '@/app/components/mainInvoice/ServiceDetailsSection';
import PaymentDateSection from '@/app/components/mainInvoice/PaymentDateSection';
import AdditionalNotesSection from '@/app/components/mainInvoice/AdditionalNotesSection';
import { InvoiceFormData } from '@/types/invoice';

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
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        taxEnabled: false,
        discount: '',
        notes: '',
        businessLogo: null,
        clientSignature: null,
    });

    const stableOnDataUpdate = useCallback(onDataUpdate, [onDataUpdate]);

    useEffect(() => {
        stableOnDataUpdate(formData);
    }, [formData, stableOnDataUpdate]);

    const handleChange = (field: keyof InvoiceFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (field: 'businessLogo' | 'clientSignature', file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, [field]: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (field: 'businessLogo' | 'clientSignature') => {
        setFormData(prev => ({ ...prev, [field]: null }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
            <BusinessInfoSection
                formData={formData}
                onFieldChange={handleChange}
                onImageUpload={handleImageUpload}
                onImageRemove={removeImage}
            />

            <ClientDetailsSection
                formData={formData}
                onFieldChange={handleChange}
                onImageUpload={handleImageUpload}
                onImageRemove={removeImage}
            />

            <ServiceDetailsSection
                formData={formData}
                onFieldChange={handleChange}
            />

            <PaymentDateSection
                formData={formData}
                onFieldChange={handleChange}
            />

            <AdditionalNotesSection
                formData={formData}
                onFieldChange={handleChange}
            />
        </div>
    );
}