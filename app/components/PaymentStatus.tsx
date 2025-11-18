// app/components/PaymentStatus.tsx
'use client';
import { useState } from 'react';

type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed';

export default function PaymentStatus({ invoiceNumber, amount }: { invoiceNumber: string, amount: number }) {
    const [status, setStatus] = useState<PaymentStatus>('pending');

    return (
        <div className={`p-4 rounded-lg ${
            status === 'paid' ? 'bg-green-100 border-green-400 text-green-800' :
                status === 'failed' ? 'bg-red-100 border-red-400 text-red-800' :
                    'bg-yellow-100 border-yellow-400 text-yellow-800'
        } border-2`}>
            <div className="flex justify-between items-center">
                <span className="font-semibold">Payment Status: {status.toUpperCase()}</span>
                {status === 'pending' && (
                    <button
                        onClick={() => setStatus('processing')}
                        className="bg-orange-500 text-white px-4 py-2 rounded text-sm"
                    >
                        Mark as Paid
                    </button>
                )}
            </div>
            {status === 'paid' && (
                <p className="text-sm mt-2">Payment confirmed for invoice {invoiceNumber}</p>
            )}
        </div>
    );
}