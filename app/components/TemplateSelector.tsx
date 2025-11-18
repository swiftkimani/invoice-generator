// app/components/TemplateSelector.tsx
'use client';

const templates = [
    { id: 'modern', name: 'Modern', colors: { primary: '#F97316', secondary: '#EC4899' } },
    { id: 'professional', name: 'Professional', colors: { primary: '#2563EB', secondary: '#1E40AF' } },
    { id: 'minimal', name: 'Minimal', colors: { primary: '#059669', secondary: '#047857' } },
];

export default function TemplateSelector({ onTemplateChange }: { onTemplateChange: (template: any) => void }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Choose Template</label>
            <div className="flex gap-4">
                {templates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => onTemplateChange(template)}
                        className="p-4 border-2 rounded-lg hover:border-orange-500 transition-colors"
                        style={{ borderColor: template.colors.primary }}
                    >
                        <div className="w-20 h-12 rounded" style={{ background: `linear-gradient(45deg, ${template.colors.primary}, ${template.colors.secondary})` }} />
                        <span className="text-sm mt-1 block text-gray-900 dark:text-white">{template.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}