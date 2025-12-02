'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DriverOnboardingSuccessPage() {
    const router = useRouter();

    const nextSteps = [
        {
            icon: FileText,
            title: 'Application Review',
            description: 'Our team will review your documents and information',
            time: '24-48 hours'
        },
        {
            icon: Mail,
            title: 'Email Notification',
            description: "You'll receive an email with the review outcome",
            time: 'Within 2 days'
        },
        {
            icon: CheckCircle,
            title: 'Account Activation',
            description: 'Once approved, your driver account will be activated',
            time: 'Immediate'
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                    Application Submitted!
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Thank you for completing your driver application. We're excited to have you join our platform!
                </p>

                {/* What Happens Next */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        What happens next?
                    </h2>

                    <div className="space-y-4">
                        {nextSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                                            <Icon className="w-5 h-5 text-gray-700" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                                                {step.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-gray-900 text-sm mb-1">
                                Check your email
                            </p>
                            <p className="text-xs text-gray-600">
                                We've sent a confirmation email with your application details.
                                You'll receive updates about your application status at the email address you provided.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={() => router.push('/driver/dashboard')}
                        className="w-full"
                        size="lg"
                    >
                        Go to Dashboard
                    </Button>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full text-center text-sm text-gray-600 hover:text-gray-700 py-2"
                    >
                        Return to Home
                    </button>
                </div>

                {/* Help Text */}
                <p className="text-xs text-center text-gray-500 mt-6">
                    Questions? Contact our support team at{' '}
                    <a href="mailto:support@uber.com" className="underline hover:text-gray-700">
                        support@uber.com
                    </a>
                </p>
            </div>
        </main>
    );
}
