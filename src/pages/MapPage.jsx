import HCMMap from '@/components/custom/HCMMap';
import Footer from '@/components/custom/Footer';

function MapPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow pt-20 pb-16">
                <div className="mt-4 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bản Đồ Ẩm Thực</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Khám phá địa điểm ẩm thực tại TP. Hồ Chí Minh với bản đồ tương tác
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 md:p-6">
                        <HCMMap />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MapPage; 