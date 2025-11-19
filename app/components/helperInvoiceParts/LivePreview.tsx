'use client';

import { InvoiceData, Template, defaultTemplate, predefinedTemplates } from '@/types/invoice';
import InvoicePreview from '../InvoicePreview';
import PDFExportButton from '../PDFExportButton';

interface LivePreviewProps {
    invoiceData: InvoiceData | null;
    template: Template | null;
    invoiceRef: React.RefObject<HTMLDivElement>;
}

export default function LivePreview({ invoiceData, template, invoiceRef }: LivePreviewProps) {
    // Convert Template to TemplateConfig for InvoicePreview
    const templateConfig = template ? {
        layout: template.config.layout,
        primaryColor: template.colors.primary,
        secondaryColor: template.colors.secondary,
        backgroundColor: template.colors.background || defaultTemplate.backgroundColor,
        textColor: template.colors.text || defaultTemplate.textColor,
        accentColor: template.colors.accent || template.colors.primary,
        fontFamily: defaultTemplate.fontFamily,
        headingSize: defaultTemplate.headingSize,
        bodySize: defaultTemplate.bodySize,
        showLogo: template.config.showLogo,
        showSignature: template.config.showSignature,
        showTaxBreakdown: template.config.showTaxBreakdown,
        showPaymentMethod: defaultTemplate.showPaymentMethod,
        showNotes: defaultTemplate.showNotes,
        showDueDate: defaultTemplate.showDueDate,
        borderRadius: template.config.borderRadius,
        shadow: defaultTemplate.shadow,
        spacing: template.config.spacing,
        labels: defaultTemplate.labels
    } : undefined;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Live Preview
                </h3>
                {invoiceData && <PDFExportButton invoiceRef={invoiceRef} />}
            </div>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[500px] overflow-auto">
                {invoiceData ? (
                    <InvoicePreview
                        data={invoiceData}
                        template={templateConfig}
                    />
                ) : (
                    <EmptyPreview />
                )}
            </div>
        </div>
    );
}

function EmptyPreview() {
    return (
        <div className="text-center text-gray-400 py-20">
            <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                    className="w-16 h-16 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <div>
                    <p className="text-lg font-medium text-gray-500 mb-2">
                        No Invoice Data
                    </p>
                    <p className="text-sm text-gray-400">
                        Your invoice will appear here as you fill in the form
                    </p>
                </div>
            </div>
        </div>
    );
}