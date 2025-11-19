import ImageUploadField from './ImageUploadField';
import { ImageSectionProps } from '@/types/invoice';
import FormField from './FormField';

export default function ClientDetailsSection({
                                                 formData,
                                                 onFieldChange,
                                                 onImageUpload,
                                                 onImageRemove
                                             }: ImageSectionProps) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Client Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ImageUploadField
                    label="Client Signature"
                    image={formData.clientSignature}
                    onImageUpload={(file) => onImageUpload('clientSignature', file)}
                    onImageRemove={() => onImageRemove('clientSignature')}
                    uploadId="clientSignatureUpload"
                    helpText="Client's signature for approval"
                    imageClass="w-32 h-20"
                    containerClass="bg-white"
                />

                <FormField
                    label="Client Name *"
                    type="text"
                    value={formData.clientName}
                    onChange={(value) => onFieldChange('clientName', value)}
                    placeholder="Client full name"
                />

                <FormField
                    label="Client Phone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(value) => onFieldChange('clientPhone', value)}
                    placeholder="07XX XXX XXX"
                />

                <FormField
                    label="Client Email"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(value) => onFieldChange('clientEmail', value)}
                    placeholder="client@email.com"
                />

                <FormField
                    label="Client Address"
                    type="text"
                    value={formData.clientAddress}
                    onChange={(value) => onFieldChange('clientAddress', value)}
                    placeholder="Client address"
                />
            </div>
        </section>
    );
}