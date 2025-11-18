// app/components/PDFExportButton.tsx
'use client';
// import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PDFExportButton({ invoiceRef }: { invoiceRef: React.RefObject<HTMLDivElement> }) {
    const generatePDF = async () => {
        if (!invoiceRef.current) return;

        const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${Date.now()}.pdf`);
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
            Download PDF
        </button>
    );
}