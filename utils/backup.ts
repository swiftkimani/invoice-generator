// utils/backup.ts
export function exportInvoicesToCSV(invoices: any[]) {
    const headers = ['Invoice Number', 'Client', 'Amount', 'Date', 'Status'];
    const csvContent = [
        headers.join(','),
        ...invoices.map(inv => [
            inv.invoiceNumber,
            inv.clientName,
            inv.total,
            inv.date,
            inv.status
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoices-backup-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}