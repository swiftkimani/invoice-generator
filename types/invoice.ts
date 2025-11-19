export type PaymentMethod = 'mpesa' | 'cash' | 'bank';

export interface InvoiceFormData {
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
    paymentMethod: PaymentMethod;
    date: string;
    dueDate: string;
    notes: string;
    businessLogo: string | null;
    clientSignature: string | null;
}

export interface BaseSectionProps {
    formData: InvoiceFormData;
    onFieldChange: (field: keyof InvoiceFormData, value: string | boolean) => void;
}

export interface ImageSectionProps extends BaseSectionProps {
    onImageUpload: (field: 'businessLogo' | 'clientSignature', file: File) => void;
    onImageRemove: (field: 'businessLogo' | 'clientSignature') => void;
}

export interface InvoiceData {
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
    paymentMethod: PaymentMethod;
    date: string;
    dueDate: string;
    notes: string;
    businessLogo?: string | null;
    clientSignature?: string | null;
}

export interface Client {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export type ActiveTab = 'create' | 'preview' | 'dashboard';

// Template Types
export interface Template {
    id: string;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent?: string;
        background?: string;
        text?: string;
    };
    config: {
        layout: 'modern' | 'classic' | 'minimal' | 'corporate';
        showLogo: boolean;
        showSignature: boolean;
        showTaxBreakdown: boolean;
        borderRadius: string;
        spacing: string;
    };
}

export interface TemplateConfig {
    layout: 'modern' | 'classic' | 'minimal' | 'corporate';
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    headingSize: string;
    bodySize: string;
    showLogo: boolean;
    showSignature: boolean;
    showTaxBreakdown: boolean;
    showPaymentMethod: boolean;
    showNotes: boolean;
    showDueDate: boolean;
    borderRadius: string;
    shadow: string;
    spacing: string;
    customFields?: Array<{
        label: string;
        value: string;
        position: 'header' | 'client' | 'footer';
    }>;
    labels: {
        invoice: string;
        invoiceNumber: string;
        billTo: string;
        date: string;
        dueDate: string;
        serviceDescription: string;
        amount: string;
        discount: string;
        subtotal: string;
        tax: string;
        total: string;
        paymentMethod: string;
        notes: string;
    };
}

// Default Template Configuration
export const defaultTemplate: TemplateConfig = {
    layout: 'modern',
    primaryColor: '#1f2937',
    secondaryColor: '#6b7280',
    backgroundColor: '#ffffff',
    textColor: '#374151',
    accentColor: '#f59e0b',
    fontFamily: 'Inter, sans-serif',
    headingSize: '1.875rem',
    bodySize: '0.875rem',
    showLogo: true,
    showSignature: true,
    showTaxBreakdown: true,
    showPaymentMethod: true,
    showNotes: true,
    showDueDate: true,
    borderRadius: '0.5rem',
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    spacing: '2rem',
    labels: {
        invoice: 'INVOICE',
        invoiceNumber: '#',
        billTo: 'Bill To:',
        date: 'Date:',
        dueDate: 'Due Date:',
        serviceDescription: 'Service Description',
        amount: 'Amount:',
        discount: 'Discount:',
        subtotal: 'Subtotal:',
        tax: 'Tax:',
        total: 'Total:',
        paymentMethod: 'Payment Method:',
        notes: 'Notes:'
    }
};

// Predefined Templates Array
export const templates: Template[] = [
    {
        id: 'black-white',
        name: 'Black & White',
        colors: {
            primary: '#000000',
            secondary: '#666666',
            accent: '#333333',
            background: '#FFFFFF',
            text: '#000000'
        },
        config: {
            layout: 'minimal',
            showLogo: false,
            showSignature: false,
            showTaxBreakdown: false,
            borderRadius: '0rem',
            spacing: '0.75rem'
        }
    },
    {
        id: 'modern',
        name: 'Modern',
        colors: {
            primary: '#F97316',
            secondary: '#EC4899',
            accent: '#F59E0B',
            background: '#FFFFFF',
            text: '#1F2937'
        },
        config: {
            layout: 'modern',
            showLogo: true,
            showSignature: true,
            showTaxBreakdown: true,
            borderRadius: '0.75rem',
            spacing: '1.5rem'
        }
    },
    {
        id: 'professional',
        name: 'Professional',
        colors: {
            primary: '#2563EB',
            secondary: '#1E40AF',
            accent: '#3B82F6',
            background: '#F8FAFC',
            text: '#1E293B'
        },
        config: {
            layout: 'corporate',
            showLogo: true,
            showSignature: true,
            showTaxBreakdown: true,
            borderRadius: '0.5rem',
            spacing: '1.25rem'
        }
    },
    {
        id: 'minimal',
        name: 'Minimal',
        colors: {
            primary: '#059669',
            secondary: '#047857',
            accent: '#10B981',
            background: '#FFFFFF',
            text: '#374151'
        },
        config: {
            layout: 'minimal',
            showLogo: false,
            showSignature: false,
            showTaxBreakdown: false,
            borderRadius: '0.25rem',
            spacing: '1rem'
        }
    },
    {
        id: 'classic',
        name: 'Classic',
        colors: {
            primary: '#000000',
            secondary: '#666666',
            accent: '#333333',
            background: '#FFFFFF',
            text: '#000000'
        },
        config: {
            layout: 'classic',
            showLogo: true,
            showSignature: true,
            showTaxBreakdown: true,
            borderRadius: '0rem',
            spacing: '1rem'
        }
    },
];

// Predefined template configurations for InvoicePreview
export const predefinedTemplates = {
    modern: {
        layout: 'modern',
        primaryColor: '#1f2937',
        secondaryColor: '#6b7280',
        accentColor: '#f59e0b',
    },
    minimal: {
        layout: 'minimal',
        primaryColor: '#374151',
        secondaryColor: '#9ca3af',
        showLogo: false,
        showSignature: false,
    },
    corporate: {
        layout: 'corporate',
        primaryColor: '#1e40af',
        secondaryColor: '#4b5563',
        accentColor: '#1e40af',
    },
    classic: {
        layout: 'classic',
        primaryColor: '#000000',
        secondaryColor: '#666666',
    },
};

// Helper function to create custom templates
export const createTemplate = (overrides: Partial<TemplateConfig>): Partial<TemplateConfig> => {
    return { ...defaultTemplate, ...overrides };
};


