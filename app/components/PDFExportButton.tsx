'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFExportButtonProps {
    invoiceRef: React.RefObject<HTMLDivElement | null>;
    fileName?: string;
    onExportStart?: () => void;
    onExportSuccess?: () => void;
    onExportError?: (error: Error) => void;
}

export default function PDFExportButton({
                                            invoiceRef,
                                            fileName = 'invoice',
                                            onExportStart,
                                            onExportSuccess,
                                            onExportError
                                        }: PDFExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);

    const generatePDF = async () => {
        // Validate invoice ref
        if (!invoiceRef?.current) {
            const error = new Error('No invoice content available for export');
            console.error('PDF Export Error:', error.message);
            onExportError?.(error);
            alert('Please generate an invoice first before exporting.');
            return;
        }

        const invoiceElement = invoiceRef.current;

        // Check if element has visible content
        const hasContent = invoiceElement.innerHTML &&
            invoiceElement.textContent?.trim().length > 0 &&
            invoiceElement.offsetWidth > 0 &&
            invoiceElement.offsetHeight > 0;

        if (!hasContent) {
            const error = new Error('Invoice content is empty or not visible');
            console.error('PDF Export Error:', error.message);
            onExportError?.(error);
            alert('Invoice content is empty or not visible. Please fill in the invoice details and ensure it is displayed.');
            return;
        }

        setIsExporting(true);
        onExportStart?.();

        try {
            console.log('Starting PDF export process...');
            console.log('Element dimensions:', {
                width: invoiceElement.offsetWidth,
                height: invoiceElement.offsetHeight,
                scrollWidth: invoiceElement.scrollWidth,
                scrollHeight: invoiceElement.scrollHeight
            });

            // Store original styles to restore later
            const originalStyles = {
                position: invoiceElement.style.position,
                left: invoiceElement.style.left,
                top: invoiceElement.style.top,
                zIndex: invoiceElement.style.zIndex,
                opacity: invoiceElement.style.opacity,
                transform: invoiceElement.style.transform,
            };

            // Make element visible and properly positioned for capture
            invoiceElement.style.position = 'fixed';
            invoiceElement.style.left = '0';
            invoiceElement.style.top = '0';
            invoiceElement.style.zIndex = '99999';
            invoiceElement.style.opacity = '1';
            invoiceElement.style.transform = 'translateZ(0)'; // Force hardware acceleration

            // Force a reflow to ensure styles are applied
            await new Promise(resolve => {
                invoiceElement.offsetHeight; // Trigger reflow
                setTimeout(resolve, 100);
            });

            // Configure html2canvas with optimized settings
            const canvas = await html2canvas(invoiceElement, {
                scale: 2,
                useCORS: true,
                logging: true, // Enable to see what's happening
                backgroundColor: '#ffffff',
                removeContainer: false,
                allowTaint: true, // Allow tainted canvas for better image handling
                foreignObjectRendering: true, // Use foreignObject for better rendering
                imageTimeout: 15000, // Increase timeout for images
                onclone: (clonedDoc, element) => {
                    console.log('Cloning element for export...');

                    // Ensure the cloned element is properly styled
                    (element as HTMLElement).style.backgroundColor = '#ffffff';
                    (element as HTMLElement).style.color = '#000000';
                    (element as HTMLElement).style.boxShadow = 'none';

                    // Handle images
                    const images = element.getElementsByTagName('img');
                    for (let img of Array.from(images)) {
                        img.crossOrigin = 'anonymous';
                        console.log('Image found:', img.src);
                    }
                }
            }).catch(error => {
                console.error('html2canvas error:', error);
                throw new Error(`Failed to capture invoice: ${error.message}`);
            });

            console.log('Canvas created:', {
                width: canvas.width,
                height: canvas.height,
                data: canvas.toDataURL().substring(0, 100) + '...'
            });

            // Restore original styles immediately
            invoiceElement.style.position = originalStyles.position;
            invoiceElement.style.left = originalStyles.left;
            invoiceElement.style.top = originalStyles.top;
            invoiceElement.style.zIndex = originalStyles.zIndex;
            invoiceElement.style.opacity = originalStyles.opacity;
            invoiceElement.style.transform = originalStyles.transform;

            // Validate canvas has content
            if (canvas.width === 0 || canvas.height === 0) {
                throw new Error('Generated canvas is empty (0x0 dimensions)');
            }

            // Check if canvas has any non-transparent/white pixels
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                let hasVisiblePixels = false;

                for (let i = 0; i < pixels.length; i += 4) {
                    // Check if pixel is not completely transparent or white
                    if (pixels[i + 3] > 10 && // alpha
                        (pixels[i] < 250 || pixels[i + 1] < 250 || pixels[i + 2] < 250)) { // not white
                        hasVisiblePixels = true;
                        break;
                    }
                }

                if (!hasVisiblePixels) {
                    throw new Error('Canvas appears to be completely blank');
                }
            }

            const imgData = canvas.toDataURL('image/png', 1.0);
            console.log('Image data generated, length:', imgData.length);

            // Create PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate image dimensions with margins
            const margin = 10;
            const imgWidth = pdfWidth - (2 * margin);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            console.log('Adding image to PDF...', {
                pdfWidth,
                pdfHeight,
                imgWidth,
                imgHeight
            });

            // Add first page
            pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

            // Handle multi-page content
            let currentHeight = imgHeight + margin;
            let pageCount = 1;

            while (currentHeight > pdfHeight - margin) {
                pdf.addPage();
                const yPosition = -(currentHeight - pdfHeight + margin);
                pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
                currentHeight -= (pdfHeight - (2 * margin));
                pageCount++;
            }

            console.log(`PDF generated with ${pageCount} pages`);

            // Generate filename
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
            const finalFileName = `${fileName}-${timestamp}.pdf`;

            // Save PDF
            pdf.save(finalFileName);

            console.log('PDF saved successfully:', finalFileName);
            onExportSuccess?.();

        } catch (error) {
            console.error('PDF Export Failed:', error);

            // Ensure styles are restored even on error
            if (invoiceRef.current) {
                invoiceRef.current.style.position = '';
                invoiceRef.current.style.left = '';
                invoiceRef.current.style.top = '';
                invoiceRef.current.style.zIndex = '';
                invoiceRef.current.style.opacity = '';
                invoiceRef.current.style.transform = '';
            }

            const exportError = error instanceof Error
                ? error
                : new Error('Unknown error occurred during PDF export');

            onExportError?.(exportError);

            // Provide specific guidance based on error type
            if (exportError.message.includes('blank') || exportError.message.includes('empty')) {
                alert('The invoice appears to be empty or not properly displayed. Please ensure all invoice data is filled out and try again.');
            } else if (exportError.message.includes('capture')) {
                alert('Failed to capture the invoice content. This might be due to browser security restrictions. Please try using a different browser or check if any content blockers are interfering.');
            } else {
                alert(`Failed to export PDF: ${exportError.message}. Please try again.`);
            }

        } finally {
            setIsExporting(false);
        }
    };

    // Simple fallback method using window.print()
    const fallbackToPrint = () => {
        console.log('Using print fallback...');
        window.print();
    };

    const handleExport = async () => {
        if (!invoiceRef?.current) {
            alert('Invoice content is not ready. Please wait a moment and try again.');
            return;
        }

        try {
            await generatePDF();
        } catch (error) {
            console.error('PDF export failed, offering fallback options...', error);

            const usePrint = confirm(
                'PDF export failed. Would you like to use the browser\'s print function instead? ' +
                'You can then "Save as PDF" from the print dialog.'
            );

            if (usePrint) {
                fallbackToPrint();
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleExport}
                disabled={isExporting}
                className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                    ${isExporting
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-md hover:shadow-lg'
                }
                `}
                title={isExporting ? 'Exporting PDF...' : 'Export as PDF'}
            >
                {isExporting ? (
                    <>
                        <Spinner />
                        Exporting...
                    </>
                ) : (
                    <>
                        <PDFIcon />
                        Export PDF
                    </>
                )}
            </button>

            {/* Fallback print button */}
            <button
                onClick={fallbackToPrint}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
                Having issues? Try printing instead
            </button>
        </div>
    );
}

// Loading spinner component
function Spinner() {
    return (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
}

// PDF icon component
function PDFIcon() {
    return (
        <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    );
}