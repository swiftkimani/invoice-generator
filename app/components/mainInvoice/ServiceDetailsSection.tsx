import { BaseSectionProps } from '../../../types/invoice';
import FormField from "@/app/components/mainInvoice/FormField";

export default function ServiceDetailsSection({ formData, onFieldChange }: BaseSectionProps) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Service Details</h3>
            <div className="space-y-5">
                <FormField
                    label="Service Description *"
                    type="textarea"
                    value={formData.serviceDescription}
                    onChange={(value) => onFieldChange('serviceDescription', value)}
                    placeholder="Describe the service provided..."
                    rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FormField
                        label="Amount (KES) *"
                        type="number"
                        value={formData.amount}
                        onChange={(value) => onFieldChange('amount', value)}
                        placeholder="0"
                        min="0"
                    />

                    <FormField
                        label="Discount (KES)"
                        type="number"
                        value={formData.discount}
                        onChange={(value) => onFieldChange('discount', value)}
                        placeholder="0"
                        min="0"
                    />

                    <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.taxEnabled}
                                onChange={e => onFieldChange('taxEnabled', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-400 text-orange-600 focus:ring-orange-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Include 16% VAT
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}