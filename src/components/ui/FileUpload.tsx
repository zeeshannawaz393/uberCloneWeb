'use client';

import { useRef, useState } from 'react';
import { fileToBase64, validateFileSize, validateFileType } from '@/lib/validation';

interface FileUploadProps {
    label: string;
    value: string | null; // base64 string
    onChange: (base64: string | null) => void;
    accept?: string[];
    maxSizeMB?: number;
    required?: boolean;
    error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    label,
    value,
    onChange,
    accept = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'],
    maxSizeMB = 5,
    required = false,
    error
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [localError, setLocalError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const inputId = `file-${label.toLowerCase().replace(/\s/g, '-')}`;
    const errorId = `${inputId}-error`;
    const displayError = error || localError;

    const handleFile = async (file: File) => {
        setLocalError('');
        setIsLoading(true);

        // Validate file size
        if (!validateFileSize(file, maxSizeMB)) {
            setLocalError(`File size must be less than ${maxSizeMB}MB`);
            setIsLoading(false);
            return;
        }

        // Validate file type
        if (!validateFileType(file, accept)) {
            setLocalError('Invalid file type');
            setIsLoading(false);
            return;
        }

        try {
            const base64 = await fileToBase64(file);
            onChange(base64);
        } catch (err) {
            setLocalError('Failed to process file');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleRemove = () => {
        onChange(null);
        setLocalError('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const getFileExtension = (base64: string): string => {
        if (typeof base64 !== 'string') return 'File';
        if (base64.includes('image/jpeg') || base64.includes('image/jpg')) return 'JPG';
        if (base64.includes('image/png')) return 'PNG';
        if (base64.includes('image/webp')) return 'WEBP';
        if (base64.includes('application/pdf')) return 'PDF';
        return 'File';
    };

    return (
        <div>
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label} {required && <span className="text-red-600" aria-label="required">*</span>}
            </label>

            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive ? 'border-black bg-gray-50' :
                    displayError ? 'border-red-500' :
                        'border-gray-300 hover:border-gray-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {isLoading ? (
                    <div className="text-center py-4">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                        <p className="text-sm text-gray-600 mt-2">Processing...</p>
                    </div>
                ) : value ? (
                    <div className="space-y-3">
                        {typeof value === 'string' && value.startsWith('data:image') ? (
                            <img
                                src={value}
                                alt={label}
                                className="max-h-48 mx-auto rounded"
                            />
                        ) : (
                            <div className="flex items-center justify-center">
                                <div className="bg-gray-100 rounded px-4 py-2">
                                    <p className="text-sm font-medium">
                                        {typeof value === 'string' ? getFileExtension(value) : 'File'} Uploaded
                                    </p>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="w-full text-sm text-red-600 hover:text-red-700 font-medium"
                            aria-label={`Remove ${label}`}
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            ref={inputRef}
                            id={inputId}
                            type="file"
                            accept={accept.join(',')}
                            onChange={handleChange}
                            className="hidden"
                            aria-invalid={Boolean(displayError)}
                            aria-describedby={displayError ? errorId : undefined}
                            aria-required={required}
                        />
                        <label
                            htmlFor={inputId}
                            className="cursor-pointer block text-center"
                        >
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-medium text-black hover:underline">Click to upload</span> or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Max {maxSizeMB}MB
                            </p>
                        </label>
                    </>
                )}
            </div>

            {displayError && (
                <p
                    id={errorId}
                    className="text-sm text-red-600 mt-1"
                    role="alert"
                >
                    {displayError}
                </p>
            )}
        </div>
    );
};
