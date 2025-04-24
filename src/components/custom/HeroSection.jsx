import { Search } from 'lucide-react';

function HeroSection() {
    return (
        <div className="relative min-h-[600px] flex items-center bg-gradient-to-r from-red-600 to-red-800 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <img 
                    src="https://salindaresort.com/uploads/articles/134/bo-tui-11-quan-banh-xeo-ngon-nhat-phu-quoc.jpg" 
                    alt="Vietnamese food background" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16 md:py-20">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold font-lobster text-white mb-6">
                        Khám phá ẩm thực Việt Nam
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Tìm kiếm, học hỏi, và trải nghiệm những giá trị văn hóa ẩm thực đặc sắc ngay tại TP. Hồ Chí Minh
                    </p>
                    
                    {/* Search Bar */}
                    <div className="bg-white p-3 rounded-full shadow-xl flex items-center">
                        <div className="flex-grow">
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm địa điểm, món ăn..."
                                className="w-full px-4 py-3 text-gray-700 focus:outline-none text-lg"
                            />
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 px-6 flex items-center font-medium">
                            <Search className="mr-2" size={20} />
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection; 