import Footer from '@/components/custom/Footer';
import HeroSection from '@/components/custom/HeroSection';
import StatsSection from '@/components/custom/StatsSection';
import FeaturedRestaurantsSection from '@/components/custom/FeaturedRestaurantsSection';
import AboutContactSection from '@/components/custom/AboutContactSection';

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <StatsSection />
            <FeaturedRestaurantsSection />
            <AboutContactSection />
            <Footer />
        </div>
    );
}

export default HomePage; 