import { InvoiceData } from '@/types/invoice';
import PaymentStatus from '../PaymentStatus';

interface InvoiceActionsProps {
    invoiceData: InvoiceData;
}

export default function InvoiceActions({ invoiceData }: InvoiceActionsProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Invoice Actions
            </h3>

            <PaymentStatus
                invoiceNumber={invoiceData.invoiceNumber}
                amount={Number(invoiceData.amount)}
            />

            <ActionButtons />
        </div>
    );
}

function ActionButtons() {
    return (
        <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Send to Client
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Draft
            </button>
        </div>
    );
}