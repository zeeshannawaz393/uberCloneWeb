import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { DriverHero } from '@/components/driver/DriverHero';
import { DriverFeatures } from '@/components/driver/DriverFeatures';
import { DriverRequirements } from '@/components/driver/DriverRequirements';
import { DriverExtras } from '@/components/driver/DriverExtras';
import { DriverFAQ } from '@/components/driver/DriverFAQ';
import { DriverApp } from '@/components/driver/DriverApp';
import { DriverQR } from '@/components/driver/DriverQR';
import { DriverSignup } from '@/components/driver/DriverSignup';

export default function DriverPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <DriverHero />
                <DriverFeatures />
                <DriverRequirements />
                <DriverExtras />
                <DriverFAQ />
                <DriverApp />
                <DriverQR />
                <DriverSignup />
            </main>
            <Footer />
        </div>
    );
}
