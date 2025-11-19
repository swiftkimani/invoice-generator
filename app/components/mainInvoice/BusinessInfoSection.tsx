import ImageUploadField from './ImageUploadField';
import { ImageSectionProps } from '@/types/invoice';
import FormField from "@/app/components/mainInvoice/FormField";

export default function BusinessInfoSection({
                                                formData,
                                                onFieldChange,
                                                onImageUpload,
                                                onImageRemove
                                            }: ImageSectionProps) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Your Business</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ImageUploadField
                    label="Business Logo"
                    image={formData.businessLogo}
                    onImageUpload={(file) => onImageUpload('businessLogo', file)}
                    onImageRemove={() => onImageRemove('businessLogo')}
                    uploadId="businessLogoUpload"
                    helpText="Recommended: 200x200px, PNG or JPG"
                    imageClass="w-20 h-20"
                />

                <div className="md:col-span-2">
                    <FormField
                        label="Business Name *"
                        type="text"
                        value={formData.businessName}
                        onChange={(value) => onFieldChange('businessName', value)}
                        placeholder="e.g., Juma's Barber Shop"
                    />
                </div>

                <FormField
                    label="Phone Number"
                    type="tel"
                    value={formData.businessPhone}
                    onChange={(value) => onFieldChange('businessPhone', value)}
                    placeholder="07XX XXX XXX"
                />

                <FormField
                    label="Email Address"
                    type="email"
                    value={formData.businessEmail}
                    onChange={(value) => onFieldChange('businessEmail', value)}
                    placeholder="business@email.com"
                />

                <div className="md:col-span-2">
                    <FormField
                        label="Business Address"
                        type="textarea"
                        value={formData.businessAddress}
                        onChange={(value) => onFieldChange('businessAddress', value)}
                        placeholder="Your business address..."
                        rows={2}
                    />
                </div>
            </div>
        </section>
    );
}