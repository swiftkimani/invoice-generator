interface FormFieldProps {
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    min?: string;
    required?: boolean;
}

export default function FormField({
                                      label,
                                      type,
                                      value,
                                      onChange,
                                      placeholder,
                                      rows,
                                      min,
                                      required = false
                                  }: FormFieldProps) {
    const baseClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none";

    const renderField = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={rows}
                    className={`${baseClasses} resize-none`}
                    placeholder={placeholder}
                    required={required}
                />
            );
        }

        return (
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={baseClasses}
                placeholder={placeholder}
                min={min}
                required={required}
            />
        );
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            {renderField()}
        </div>
    );
}