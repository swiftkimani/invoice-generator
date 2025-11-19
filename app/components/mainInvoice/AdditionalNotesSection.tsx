import { BaseSectionProps } from '@/types/invoice';
import FormField from "@/app/components/mainInvoice/FormField";

export default function AdditionalNotesSection({ formData, onFieldChange }: BaseSectionProps) {
    return (
        <FormField
            label="Additional Notes"
            type="textarea"
            value={formData.notes}
            onChange={(value) => onFieldChange('notes', value)}
            placeholder="Any additional notes or terms..."
            rows={3}
        />
    );
}