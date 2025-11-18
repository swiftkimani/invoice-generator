// utils/notifications.ts
export async function sendInvoiceNotification(
    clientPhone: string,
    clientEmail: string,
    invoiceNumber: string,
    amount: number
) {
    // Send SMS
    await fetch('/api/send-sms', {
        method: 'POST',
        body: JSON.stringify({
            to: clientPhone,
            message: `Hello! Your invoice ${invoiceNumber} for KES ${amount} is ready. View: https://yourapp.com/invoice/${invoiceNumber}`
        })
    });

    // Send Email
    await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
            to: clientEmail,
            subject: `Invoice ${invoiceNumber}`,
            html: `<p>Your invoice for KES ${amount} is attached.</p>`
        })
    });
}