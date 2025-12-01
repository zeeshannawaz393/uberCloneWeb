'use client';

import { useState } from 'react';
import { BaseModal } from '@/components/common/BaseModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { LocationIcon } from './LocationIcon';

interface AddPlaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, address: string) => void;
}

export function AddPlaceModal({ isOpen, onClose, onSave }: AddPlaceModalProps) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isAddressInputFocused, setIsAddressInputFocused] = useState(false);

    const { predictions } = usePlacesAutocomplete(address, {
        debounceMs: 300,
    });

    const handleSave = () => {
        if (name.trim() && address.trim()) {
            onSave(name.trim(), address.trim());
            setName('');
            setAddress('');
            onClose();
        }
    };

    const handleSelectAddress = (selectedAddress: string) => {
        setAddress(selectedAddress);
        setIsAddressInputFocused(false);
    };

    const footer = (
        <Button
            variant="solid"
            size="lg"
            onClick={handleSave}
            disabled={!name.trim() || !address.trim()}
            className="w-full"
        >
            Save
        </Button>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add place"
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
