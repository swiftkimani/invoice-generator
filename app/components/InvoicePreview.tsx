'use client';

import { useRef } from 'react';
import { InvoiceData, TemplateConfig, defaultTemplate } from '@/types/invoice';

type InvoicePreviewProps = {
    data: InvoiceData | null;
    template?: Partial<TemplateConfig>;
};

export default function InvoicePreview({ data, template }: InvoicePreviewProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const config: TemplateConfig = { ...defaultTemplate, ...template };

    if (!data) {
        return (
            <div className="text-center text-gray-500 py-8">
                No invoice data available. Please fill in the form to generate an invoice.
            </div>
        );
    }

    // Calculate totals
    const amount = parseFloat(data.amount) || 0;
    const discount = parseFloat(data.discount) || 0;
    const subtotal = amount - discount;
    const tax = data.taxEnabled ? subtotal * (data.taxRate / 100) : 0;
    const total = subtotal + tax;

    // Layout-specific styling
    const getLayoutStyles = () => {
        switch (config.layout) {
            case 'minimal':
                return {
                    container: 'border border-gray-200',
                    header: 'border-b border-gray-200',
                    section: 'border-0'
                };
            case 'corporate':
                return {
                    container: 'border-l-4 border-blue-500',
                    header: 'bg-gray-50',
                    section: 'border-l border-gray-100'
                };
            case 'classic':
                return {
                    container: 'border-2 border-gray-300',
                    header: 'border-b-2 border-gray-300',
                    section: 'border-b border-gray-200'
                };
            default: // modern
                return {
                    container: 'shadow-lg',
                    header: '',
                    section: ''
                };
        }
    };

    const layoutStyles = getLayoutStyles();

    return (
        <div className="space-y-6">
            {/* Invoice Preview */}
            <div
                ref={invoiceRef}
                className={`p-8 max-w-4xl mx-auto bg-white ${layoutStyles.container} invoice-preview`}
                style={{
                    backgroundColor: config.backgroundColor,
                    color: config.textColor,
                    fontFamily: config.fontFamily,
                    borderRadius: config.borderRadius,
                    boxShadow: config.shadow
                }}
            >
                {/* Header */}
                <div className={`flex justify-between items-start mb-8 pb-6 ${layoutStyles.header}`}>
                    <div>
                        <h1
                            className="font-bold"
                            style={{
                                color: config.primaryColor,
                                fontSize: config.headingSize
                            }}
                        >
                            {config.labels.invoice}
                        </h1>
                        <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>
                            {config.labels.invoiceNumber}{data.invoiceNumber}
                        </p>
                    </div>

                    <div className="text-right">
                        {/* Business Logo */}
                        {config.showLogo && data.businessLogo && (
                            <img
                                src={data.businessLogo}
                                alt="Business Logo"
                                className="w-20 h-20 object-contain mb-3 mx-auto"
                                crossOrigin="anonymous"
                            />
                        )}

                        <h2
                            className="font-semibold"
                            style={{ color: config.primaryColor, fontSize: '1.5rem' }}
                        >
                            {data.businessName}
                        </h2>
                        {data.businessPhone && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>
                                {data.businessPhone}
                            </p>
                        )}
                        {data.businessEmail && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>
                                {data.businessEmail}
                            </p>
                        )}
                        {data.businessAddress && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>
                                {data.businessAddress}
                            </p>
                        )}
                    </div>
                </div>

                {/* Client & Date Info */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ${layoutStyles.section}`}>
                    <div>
                        <h3
                            className="font-semibold mb-3"
                            style={{ color: config.primaryColor }}
                        >
                            {config.labels.billTo}
                        </h3>
                        <p style={{ color: config.textColor, fontSize: config.bodySize }}>{data.clientName}</p>
                        {data.clientPhone && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>{data.clientPhone}</p>
                        )}
                        {data.clientEmail && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>{data.clientEmail}</p>
                        )}
                        {data.clientAddress && (
                            <p style={{ color: config.secondaryColor, fontSize: config.bodySize }}>{data.clientAddress}</p>
                        )}
                    </div>

                    <div className="text-right md:text-left">
                        <div className="mb-3">
                            <span
                                className="font-semibold"
                                style={{ color: config.primaryColor }}
                            >
                                {config.labels.date}
                            </span>
                            <span style={{ color: config.textColor, fontSize: config.bodySize }}> {data.date}</span>
                        </div>

                        {config.showDueDate && (
                            <div className="mb-3">
                                <span
                                    className="font-semibold"
                                    style={{ color: config.primaryColor }}
                                >
                                    {config.labels.dueDate}
                                </span>
                                <span style={{ color: config.textColor, fontSize: config.bodySize }}> {data.dueDate}</span>
                            </div>
                        )}

                        {config.showPaymentMethod && (
                            <div>
                                <span
                                    className="font-semibold"
                                    style={{ color: config.primaryColor }}
                                >
                                    {config.labels.paymentMethod}
                                </span>
                                <span style={{ color: config.textColor, fontSize: config.bodySize }} className="capitalize"> {data.paymentMethod}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Service Details */}
                <div className={`mb-8 ${layoutStyles.section}`}>
                    <h3
                        className="font-semibold mb-4"
                        style={{ color: config.primaryColor }}
                    >
                        {config.labels.serviceDescription}
                    </h3>
                    <p
                        className="p-4 rounded bg-gray-50"
                        style={{
                            color: config.textColor,
                            fontSize: config.bodySize,
                        }}
                    >
                        {data.serviceDescription}
                    </p>
                </div>

                {/* Amount Breakdown */}
                <div
                    className={`border-t border-b py-4 mb-6 ${layoutStyles.section}`}
                    style={{ borderColor: '#e5e7eb' }}
                >
                    <div className="flex justify-between mb-3">
                        <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                            {config.labels.amount}
                        </span>
                        <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                            KSh {amount.toLocaleString()}
                        </span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between mb-3">
                            <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                                {config.labels.discount}
                            </span>
                            <span style={{ color: '#dc2626', fontSize: config.bodySize }}>
                                -KSh {discount.toLocaleString()}
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between mb-3">
                        <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                            {config.labels.subtotal}
                        </span>
                        <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                            KSh {subtotal.toLocaleString()}
                        </span>
                    </div>

                    {data.taxEnabled && config.showTaxBreakdown && (
                        <div className="flex justify-between mb-3">
                            <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                                {config.labels.tax} ({data.taxRate}%):
                            </span>
                            <span style={{ color: config.textColor, fontSize: config.bodySize }}>
                                KSh {tax.toLocaleString()}
                            </span>
                        </div>
                    )}

                    <div
                        className="flex justify-between font-bold mt-4 pt-4"
                        style={{
                            borderTop: '1px solid #e5e7eb',
                            color: config.accentColor,
                            fontSize: '1.125rem'
                        }}
                    >
                        <span>{config.labels.total}</span>
                        <span>KSh {total.toLocaleString()}</span>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    {config.showNotes && data.notes && (
                        <div>
                            <span
                                className="font-semibold"
                                style={{ color: config.primaryColor }}
                            >
                                {config.labels.notes}
                            </span>
                            <span style={{ color: config.textColor, fontSize: config.bodySize }}> {data.notes}</span>
                        </div>
                    )}

                    {/* Client Signature */}
                    {config.showSignature && data.clientSignature && (
                        <div className="text-right">
                            <div className="mb-2">
                                <span
                                    className="font-semibold"
                                    style={{ color: config.primaryColor }}
                                >
                                    Signature:
                                </span>
                            </div>
                            <img
                                src={data.clientSignature}
                                alt="Client Signature"
                                className="w-32 h-16 object-contain border border-gray-300 inline-block"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}