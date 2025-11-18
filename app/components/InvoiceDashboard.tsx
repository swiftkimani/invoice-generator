// components/InvoiceDashboard.tsx
'use client';
import { useState, useEffect } from 'react';

interface DashboardStats {
    totalRevenue: number;
    pendingInvoices: number;
    paidInvoices: number;
    averageInvoiceValue: number;
}

export default function InvoiceDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalRevenue: 0,
        pendingInvoices: 0,
        paidInvoices: 0,
        averageInvoiceValue: 0
    });

    const [recentInvoices, setRecentInvoices] = useState([]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-600 p-4 rounded-xl text-white">
                <p className="text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">KES {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-orange-600 p-4 rounded-xl text-white">
                <p className="text-sm">Pending Invoices</p>
                <p className="text-2xl font-bold">{stats.pendingInvoices}</p>
            </div>
            <div className="bg-green-600 p-4 rounded-xl text-white">
                <p className="text-sm">Paid Invoices</p>
                <p className="text-2xl font-bold">{stats.paidInvoices}</p>
            </div>
            <div className="bg-purple-600 p-4 rounded-xl text-white">
                <p className="text-sm">Avg. Invoice</p>
                <p className="text-2xl font-bold">KES {stats.averageInvoiceValue.toLocaleString()}</p>
            </div>
        </div>
    );
}