import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/gloabls.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Huduma Bill - Professional Invoices for Kenyan Businesses',
    description: 'Create beautiful invoices and get paid faster with M-Pesa integration',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                {children}
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}