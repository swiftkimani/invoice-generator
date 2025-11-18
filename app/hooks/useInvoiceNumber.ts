// app/hooks/useInvoiceNumber.ts
import { useState, useEffect } from 'react';

export function useInvoiceNumber() {
    const [invoiceNumber, setInvoiceNumber] = useState('');

    useEffect(() => {
        const year = new Date().getFullYear();
        const storedCount = localStorage.getItem('invoiceCount') || '0';
        const count = parseInt(storedCount) + 1;
        const paddedCount = count.toString().padStart(3, '0');

        setInvoiceNumber(`INV-${year}-${paddedCount}`);
        localStorage.setItem('invoiceCount', count.toString());
    }, []);

    return invoiceNumber;
}