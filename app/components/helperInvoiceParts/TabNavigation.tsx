import { ActiveTab } from '@/types/invoice';

interface TabNavigationProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
}

const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'create', label: 'Create Invoice' },
    { id: 'preview', label: 'Preview' },
    { id: 'dashboard', label: 'Dashboard' }
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    return (
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                        activeTab === tab.id
                            ? 'text-orange-400 border-b-2 border-orange-400'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}