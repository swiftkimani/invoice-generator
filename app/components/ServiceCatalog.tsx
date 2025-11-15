'use client';

export default function ServiceCatalog() {
    const quickServices = [
        { name: 'Boda Ride', amount: '150' },
        { name: 'Haircut', amount: '300' },
        { name: 'Photo Session', amount: '5000' },
        { name: 'Tailoring', amount: '800' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Services</h3>
            <div className="space-y-2">
                {quickServices.map((service, index) => (
                    <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">{service.name}</span>
                            <span className="text-orange-600 font-semibold">KES {service.amount}</span>
                        </div>
                    </button>
                ))}
            </div>
            <button className="w-full mt-3 text-center text-orange-600 hover:text-orange-700 text-sm font-medium">
                + Add New Service
            </button>
        </div>
    );
}