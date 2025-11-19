// components/InvoicePreview.tsx
'use client';

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

type InvoicePreviewProps = {
    data: InvoiceData | null;
    template?: any;
};

export default function InvoicePreview({ data, template }: InvoicePreviewProps) {
    if (!data) {
        return (
            <div className="text-center text-gray-500 py-8">
                No invoice data available
            </div>
        );
    }

    // Calculate totals
    const amount = parseFloat(data.amount) || 0;
    const discount = parseFloat(data.discount) || 0;
    const subtotal = amount - discount;
    const tax = data.taxEnabled ? subtotal * (data.taxRate / 100) : 0;
    const total = subtotal + tax;

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                    <p className="text-gray-600">#{data.invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-gray-800">{data.businessName}</h2>
                    <p className="text-gray-600">{data.businessPhone}</p>
                    <p className="text-gray-600">{data.businessEmail}</p>
                    <p className="text-gray-600">{data.businessAddress}</p>
                </div>
            </div>

            {/* Client & Date Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
                    <p className="text-gray-600">{data.clientName}</p>
                    <p className="text-gray-600">{data.clientPhone}</p>
                    <p className="text-gray-600">{data.clientEmail}</p>
                    <p className="text-gray-600">{data.clientAddress}</p>
                </div>
                <div className="text-right">
                    <div className="mb-4">
                        <span className="font-semibold text-gray-700">Date: </span>
                        <span className="text-gray-600">{data.date}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Due Date: </span>
                        <span className="text-gray-600">{data.dueDate}</span>
                    </div>
                </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-4">Service Description</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded">{data.serviceDescription}</p>
            </div>

            {/* Amount Breakdown */}
            <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-gray-800">KSh {amount.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Discount:</span>
                        <span className="text-red-600">-KSh {discount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-800">KSh {subtotal.toLocaleString()}</span>
                </div>
                {data.taxEnabled && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tax ({data.taxRate}%):</span>
                        <span className="text-gray-800">KSh {tax.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total:</span>
                    <span>KSh {total.toLocaleString()}</span>
                </div>
            </div>

            {/* Payment Method & Notes */}
            <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                    <span className="font-semibold text-gray-700">Payment Method: </span>
                    <span className="text-gray-600 capitalize">{data.paymentMethod}</span>
                </div>
                {data.notes && (
                    <div>
                        <span className="font-semibold text-gray-700">Notes: </span>
                        <span className="text-gray-600">{data.notes}</span>
                    </div>
                )}
            </div>

            {/* Template indicator */}
            {template && (
                <div className="mt-6 text-xs text-gray-400 text-center">
                    Template: {template.name || 'Custom'}
                </div>
            )}
        </div>
    );
}