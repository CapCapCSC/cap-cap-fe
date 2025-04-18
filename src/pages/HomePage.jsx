import Navbar from '@/components/custom/Navbar';
import SearchBar from '@/components/custom/SearchBar';
import HCMMap from '@/components/custom/HCMMap';
import AboutUs from '@/components/custom/AboutUs';
import ContactUs from '@/components/custom/ContactUs';
import Footer from '@/components/custom/Footer';

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className='mt-24'>
            <h1 className="z-50 text-6xl text-center font-lobster bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 transition-all duration-500">
                Food Map
            </h1>

            <HCMMap />
            <AboutUs />
            <ContactUs />
        </div>
        <Footer />
        </div>
    );
}

export default HomePage; 