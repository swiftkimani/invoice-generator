const SERVICES = ['Haircut', 'Manicure', 'Consultation', 'Repair'];

export default function QuickServices() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Services
            </h3>
            <div className="space-y-2">
                {SERVICES.map(service => (
                    <button
                        key={service}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {service}
                    </button>
                ))}
            </div>
        </div>
    );
}