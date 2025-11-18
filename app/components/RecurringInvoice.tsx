// components/RecurringInvoice.tsx
'use client';

type RecurringFrequency = 'weekly' | 'monthly' | 'quarterly';

export default function RecurringInvoice() {
    const [isRecurring, setIsRecurring] = useState(false);
    const [frequency, setFrequency] = useState<RecurringFrequency>('monthly');
    const [endDate, setEndDate] = useState('');

    return (
        <div className="border-t pt-4 mt-6">
            <label className="flex items-center gap-3 mb-4">
                <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} />
                <span className="font-medium">Set as recurring invoice</span>
            </label>

            {isRecurring && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-2">Frequency</label>
                        <select value={frequency} onChange={e => setFrequency(e.target.value as RecurringFrequency)}
                                className="w-full p-2 border rounded">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">End Date</label>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                               className="w-full p-2 border rounded" />
                    </div>
                </div>
            )}
        </div>
    );
}