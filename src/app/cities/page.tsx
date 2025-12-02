import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

export default function CitiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-24 pb-16 px-6 lg:px-16 max-w-[1280px] mx-auto">
                <h1 className="text-4xl font-bold mb-8">Cities</h1>
                <p className="text-lg text-gray-600">
                    Find Uber in your city.
                </p>
                {/* Content to be added */}
            </main>
            <Footer />
        </div>
    );
}
