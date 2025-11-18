// utils/mpesa.ts
export async function initiateMpesaPayment(phone: string, amount: number, invoiceNumber: string) {
    // Integrate with Daraja API
    const response = await fetch('/api/mpesa-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            phone: phone.replace(/^0/, '254'),
            amount,
            accountReference: invoiceNumber,
            transactionDesc: `Payment for invoice ${invoiceNumber}`
        })
    });

    return response.json();
}