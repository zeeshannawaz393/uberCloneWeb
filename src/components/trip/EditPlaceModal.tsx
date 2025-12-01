'use client';

import { useState, useEffect } from 'react';
import { BaseModal } from '@/components/common/BaseModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
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

    const footer = showDeleteConfirm ? (
        /* Delete Confirmation */
        <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm font-medium text-red-900 mb-1">Delete "{name}"?</p>
                <p className="text-xs text-red-700">This action cannot be undone.</p>
            </div>
            <Button
                variant="danger"
                size="lg"
                onClick={handleDelete}
                className="w-full"
            >
                Yes, delete
            </Button>
            <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full"
            >
                Cancel
            </Button>
        </div>
    ) : (
        /* Normal Buttons */
        <div className="space-y-3">
            <Button
                variant="solid"
                size="lg"
                onClick={handleSave}
                disabled={!name.trim() || !address.trim()}
                className="w-full"
            >
                Save
            </Button>
            <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full text-red-600 hover:bg-red-50"
            >
                Delete
            </Button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit ${initialName}`}
            showBackButton={true}
            onBack={onClose}
            showHeaderBorder={true}
            showFooterBorder={false}
            footer={footer}
            size="md"
        >
            <div className="p-6 space-y-4">
                {/* Name Input */}
                <Input
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Home, Work, Gym"
                />

                {/* Address Input */}
                <div className="relative">
                    <Input
                        label="Address"
                        variant="filled"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={() => setIsAddressInputFocused(true)}
                        placeholder="Search for address"
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
        </BaseModal>
    );
}
