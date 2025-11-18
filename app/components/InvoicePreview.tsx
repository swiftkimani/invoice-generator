// app/components/InvoicePreview.tsx
'use client';

type InvoiceData = {
    invoiceNumber?: string;
    businessName: string;
    businessPhone: string;
    businessEmail?: string;
    businessAddress?: string;
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    clientAddress?: string;
    serviceDescription: string;
    amount: string;
    discount: string;
    taxEnabled: boolean;
    paymentMethod: 'mpesa' | 'cash' | 'bank';
    date: string;
    dueDate?: string;
    notes?: string;
};

export default function InvoicePreview({ data }: { data: InvoiceData | null }) {
    // Handle null data case
    if (!data) {
        return (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No invoice data available. Please fill out the form to see a preview.
                    </p>
                </div>
            </div>
        );
    }

    const amount = Number(data.amount) || 0;
    const discount = Number(data.discount) || 0;
    const subtotal = amount - discount;
    const vat = data.taxEnabled ? subtotal * 0.16 : 0;
    const total = subtotal + vat;

    // Native date formatting
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-KE', options);
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(value);

    const paymentIcons: Record<string, string> = {
        mpesa: 'M-Pesa',
        cash: 'Cash',
        bank: 'Bank Transfer',
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-8 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">INVOICE</h1>
                        <p className="text-orange-100 mt-2 text-lg">Professional Service Invoice</p>
                        {data.invoiceNumber && (
                            <p className="text-orange-200 mt-1 font-mono">#{data.invoiceNumber}</p>
                        )}
                    </div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg">
                        K
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* From / Bill To */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">From</h3>
                        <div className="mt-3">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {data.businessName || 'Your Business Name'}
                            </p>
                            {data.businessPhone && (
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Phone: {data.businessPhone}</p>
                            )}
                            {data.businessEmail && (
                                <p className="text-gray-600 dark:text-gray-400">Email: {data.businessEmail}</p>
                            )}
                            {data.businessAddress && (
                                <p className="text-gray-600 dark:text-gray-400 mt-1">{data.businessAddress}</p>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <h3 className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">Bill To</h3>
                        <div className="mt-3">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {data.clientName || 'Client Name'}
                            </p>
                            {data.clientPhone && (
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Phone: {data.clientPhone}</p>
                            )}
                            {data.clientEmail && (
                                <p className="text-gray-600 dark:text-gray-400">Email: {data.clientEmail}</p>
                            )}
                            {data.clientAddress && (
                                <p className="text-gray-600 dark:text-gray-400 mt-1">{data.clientAddress}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Rest of your existing InvoicePreview JSX remains the same */}
                {/* ... */}
            </div>
        </div>
    );
}