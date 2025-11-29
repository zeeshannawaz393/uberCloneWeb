'use client';

import { useState } from 'react';

interface SavedPlace {
    id: string;
    label: string;
    address: string;
    icon: string;
}

interface SavedPlacesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPlace: (address: string) => void;
    onAddPlace: () => void;
    onEditPlace: (place: SavedPlace) => void;
    savedPlaces: SavedPlace[];
}

export function SavedPlacesModal({
    isOpen,
    onClose,
    onSelectPlace,
    onAddPlace,
    onEditPlace,
    savedPlaces
}: SavedPlacesModalProps) {
    if (!isOpen) return null;

    const getIcon = (iconType: string) => {
        switch (iconType) {
            case 'home':
                return (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                );
            case 'work':
                return (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold text-black">Saved places</h2>
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

                {/* Content - Scrollable List */}
                <div className="flex-1 overflow-y-auto">
                    {savedPlaces.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-2">No saved places yet</h3>
                            <p className="text-sm text-gray-500 mb-6">Save your favorite locations for quick access</p>
                            <button
                                onClick={() => {
                                    onAddPlace();
                                    onClose();
                                }}
                                className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Add your first place
                            </button>
                        </div>
                    ) : (
                        /* Places List */
                        savedPlaces.map((place) => (
                            <div key={place.id} className="flex items-center border-b border-gray-100 last:border-b-0">
                                <button
                                    onClick={() => {
                                        onSelectPlace(place.address);
                                        onClose();
                                    }}
                                    className="flex-1 px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        {getIcon(place.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[15px] font-semibold text-black">{place.label}</div>
                                        <div className="text-[13px] text-gray-500">{place.address}</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onEditPlace(place)}
                                    className="px-4 py-4 hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer - Add Button (only show if there are places) */}
                {savedPlaces.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                        <button
                            onClick={() => {
                                onAddPlace();
                                onClose();
                            }}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add place
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
