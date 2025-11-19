import { BaseSectionProps } from '@/types/invoice';
import FormField from "@/app/components/mainInvoice/FormField";

export default function PaymentDateSection({ formData, onFieldChange }: BaseSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                </label>
                <select
                    value={formData.paymentMethod}
                    onChange={e => onFieldChange('paymentMethod', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                >
                    <option value="mpesa">M-Pesa</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Transfer</option>
                </select>
            </div>

            <FormField
                label="Invoice Date"
                type="date"
                value={formData.date}
                onChange={(value) => onFieldChange('date', value)}
            />

            <FormField
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(value) => onFieldChange('dueDate', value)}
            />
        </div>
    );
}