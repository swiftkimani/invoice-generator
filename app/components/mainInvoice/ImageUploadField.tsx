interface ImageUploadFieldProps {
    label: string;
    image: string | null;
    onImageUpload: (file: File) => void;
    onImageRemove: () => void;
    uploadId: string;
    helpText: string;
    imageClass?: string;
    containerClass?: string;
}

export default function ImageUploadField({
                                             label,
                                             image,
                                             onImageUpload,
                                             onImageRemove,
                                             uploadId,
                                             helpText,
                                             imageClass = "w-20 h-20",
                                             containerClass = "bg-gray-50 dark:bg-gray-800"
                                         }: ImageUploadFieldProps) {
    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <div className="flex items-center gap-4">
                {image ? (
                    <div className="relative">
                        <img
                            src={image}
                            alt={label}
                            className={`${imageClass} object-contain border border-gray-300 dark:border-white/20 rounded-lg ${containerClass}`}
                        />
                        <button
                            type="button"
                            onClick={onImageRemove}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className={`${imageClass} border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg flex items-center justify-center ${containerClass}`}>
                        <span className="text-gray-400 text-2xl">+</span>
                    </div>
                )}
                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onImageUpload(file);
                        }}
                        className="hidden"
                        id={uploadId}
                    />
                    <label
                        htmlFor={uploadId}
                        className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors inline-block"
                    >
                        Upload {label.split(' ')[0]}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {helpText}
                    </p>
                </div>
            </div>
        </div>
    );
}