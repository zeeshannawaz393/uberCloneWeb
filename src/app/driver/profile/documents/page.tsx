'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Upload, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DocumentsPage() {
    const router = useRouter();

    const documents = [
        {
            name: 'Driving License',
            status: 'verified',
            expiryDate: '2027-05-15',
            uploadedDate: '2023-01-10'
        },
        {
            name: 'Vehicle Insurance',
            status: 'expiring',
            expiryDate: '2025-01-15',
            uploadedDate: '2024-01-10'
        },
        {
            name: 'MOT Certificate',
            status: 'expiring',
            expiryDate: '2025-02-20',
            uploadedDate: '2024-02-15'
        },
        {
            name: 'Vehicle Registration (V5C)',
            status: 'verified',
            expiryDate: null,
            uploadedDate: '2023-01-10'
        }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'verified':
                return (
                    <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                    </div>
                );
            case 'expiring':
                return (
                    <div className="flex items-center gap-1 text-orange-700 bg-orange-50 px-2 py-1 rounded text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        Expiring Soon
                    </div>
                );
            case 'expired':
                return (
                    <div className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        Expired
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-6">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Documents</h1>
                        <p className="text-sm text-gray-500">Manage your driver documents</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Alert */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-orange-900 text-sm">2 documents expiring soon</p>
                            <p className="text-xs text-orange-700 mt-1">Please renew your documents to continue driving</p>
                        </div>
                    </div>
                </div>

                {/* Documents List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-200">
                    {documents.map((doc, index) => (
                        <div key={index} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                                {getStatusBadge(doc.status)}
                            </div>

                            {doc.expiryDate && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>Expires: {new Date(doc.expiryDate).toLocaleDateString('en-GB')}</span>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Re-upload
                                </Button>
                                <Button variant="outline" size="sm">
                                    View
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Document */}
                <button
                    onClick={() => alert('Upload new document')}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-black"
                >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload New Document</span>
                </button>
            </div>
        </main>
    );
}
