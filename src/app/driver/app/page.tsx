import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

export default function DriverAppPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-24 pb-16 px-6 lg:px-16 max-w-[1280px] mx-auto">
                <h1 className="text-4xl font-bold mb-8">The Driver App</h1>
                <p className="text-lg text-gray-600">
                    Download the app and start earning.
                </p>
                {/* Content to be added */}
            </main>
            <Footer />
        </div>
    );
}
