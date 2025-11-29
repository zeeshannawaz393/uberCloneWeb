'use client';

import { useState, useEffect } from 'react';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { LocationIcon } from './LocationIcon';

interface EditPlaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, address: string) => void;
    onDelete: () => void;
    initialName: string;
    initialAddress: string;
}

export function EditPlaceModal({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialName,
    initialAddress
}: EditPlaceModalProps) {
    const [name, setName] = useState(initialName);
    const [address, setAddress] = useState(initialAddress);
    const [isAddressInputFocused, setIsAddressInputFocused] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { predictions } = usePlacesAutocomplete(address, {
        debounceMs: 300,
    });

    useEffect(() => {
        if (isOpen) {
            setName(initialName);
            setAddress(initialAddress);
            setShowDeleteConfirm(false);
        }
    }, [isOpen, initialName, initialAddress]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (name.trim() && address.trim()) {
            onSave(name.trim(), address.trim());
            onClose();
        }
    };

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    const handleSelectAddress = (selectedAddress: string) => {
        setAddress(selectedAddress);
        setIsAddressInputFocused(false);
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold text-black">Edit {initialName}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Home, Work, Gym"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                        />
                    </div>

                    {/* Address Input */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 mb-2 block">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onFocus={() => setIsAddressInputFocused(true)}
                            placeholder="Search for address"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                        />

                        {/* Address Suggestions */}
                        {isAddressInputFocused && predictions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
                                {predictions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectAddress(suggestion.description)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <LocationIcon types={suggestion.types} className="text-black" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[15px] font-semibold text-black">
                                                {suggestion.structured_formatting?.main_text || suggestion.description}
                                            </div>
                                            {suggestion.structured_formatting?.secondary_text && (
                                                <div className="text-[13px] text-gray-500">
                                                    {suggestion.structured_formatting.secondary_text}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 space-y-3">
                    {showDeleteConfirm ? (
                        /* Delete Confirmation */
                        <>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-3">
                                <p className="text-sm font-medium text-red-900 mb-1">Delete "{name}"?</p>
                                <p className="text-xs text-red-700">This action cannot be undone.</p>
                            </div>
                            <button
                                onClick={handleDelete}
                                className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-colors"
                            >
                                Yes, delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="w-full py-3 text-black font-semibold hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        /* Normal Buttons */
                        <>
                            <button
                                onClick={handleSave}
                                disabled={!name.trim() || !address.trim()}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
