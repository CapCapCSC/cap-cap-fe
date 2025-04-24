import { MapPin, Utensils, Book } from 'lucide-react';

function StatsSection() {
    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-20">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                <MapPin className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-xl">200+ địa điểm</h3>
                                <p className="text-gray-600">Khám phá ẩm thực khắp Sài Gòn</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                <Utensils className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-xl">500+ món ăn</h3>
                                <p className="text-gray-600">Từ truyền thống đến hiện đại</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                <Book className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-xl">100+ bài Quiz</h3>
                                <p className="text-gray-600">Học hỏi văn hóa ẩm thực</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsSection; 