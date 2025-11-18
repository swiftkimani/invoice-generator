// components/ClientManager.tsx
'use client';
import { useState } from 'react';

interface Client {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export default function ClientManager({ onSelectClient }: { onSelectClient: (client: Client) => void }) {
    const [clients, setClients] = useState<Client[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
        name: '', phone: '', email: '', address: ''
    });

    const saveClient = () => {
        const client: Client = { ...newClient, id: Date.now().toString() };
        setClients(prev => [...prev, client]);
        setNewClient({ name: '', phone: '', email: '', address: '' });
        setShowForm(false);
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Clients</h3>
                <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-1 rounded">
                    + Add
                </button>
            </div>

            {clients.map(client => (
                <div key={client.id} className="p-3 border border-gray-600 rounded mb-2 cursor-pointer hover:bg-gray-700"
                     onClick={() => onSelectClient(client)}>
                    <p className="text-white font-medium">{client.name}</p>
                    <p className="text-gray-400 text-sm">{client.phone}</p>
                </div>
            ))}
        </div>
    );
}