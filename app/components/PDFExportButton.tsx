// components/PDFExportButton.tsx
'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFExportButtonProps {
    invoiceRef: React.RefObject<HTMLDivElement | null>; // Add null here
}

export default function PDFExportButton({ invoiceRef }: PDFExportButtonProps) {
    const generatePDF = async () => {
        if (!invoiceRef.current) {
            console.error('Invoice ref is null');
            return;
        }

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('invoice.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
            Export PDF
        </button>
    );
}