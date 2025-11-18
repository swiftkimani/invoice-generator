// types/invoice.ts
export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
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
    lineItems: LineItem[];
    discount: number;
    taxEnabled: boolean;
    taxRate: number;
    paymentMethod: 'mpesa' | 'cash' | 'bank';
    date: string;
    dueDate: string;
    notes: string;
}