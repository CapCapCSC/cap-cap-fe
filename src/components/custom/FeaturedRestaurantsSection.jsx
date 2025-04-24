import { ChevronRight, Star } from 'lucide-react';

function FeaturedRestaurantsSection() {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Địa điểm nổi bật</h2>
                        <p className="text-lg text-gray-600">
                            Khám phá các địa điểm ẩm thực được yêu thích
                        </p>
                    </div>
                    <a href="/restaurants" className="text-red-600 font-medium flex items-center hover:text-red-700">
                        Xem tất cả <ChevronRight size={16} />
                    </a>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Food Spot Card 1 */}
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
                        <div className="h-48 overflow-hidden">
                            <img 
                                src="https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/20-quan-an-ngon-hcm/top-20-quan-an-ngon-noi-tieng-nhat-o-sai-gon-1.jpg" 
                                alt="Food spot" 
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-2">
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Quận 1</span>
                                <div className="flex items-center ml-auto">
                                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                    <span className="ml-1 text-sm font-medium">4.8</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quán A</h3>
                            <p className="text-gray-600 mb-4">Địa chỉ quán, Quận 1, TP. Hồ Chí Minh</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Phở</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Bún bò</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Cơm tấm</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Food Spot Card 2 */}
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
                        <div className="h-48 overflow-hidden">
                            <img 
                                src="https://top10tphcm.com/wp-content/uploads/2020/12/Quan-an-co-khong-gian-rong.jpg" 
                                alt="Food spot" 
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-2">
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Quận 3</span>
                                <div className="flex items-center ml-auto">
                                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                    <span className="ml-1 text-sm font-medium">4.5</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quán B</h3>
                            <p className="text-gray-600 mb-4">Địa chỉ quán, Quận 3, TP. Hồ Chí Minh</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Bánh mì</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Bánh canh</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Súp</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Food Spot Card 3 */}
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
                        <div className="h-48 overflow-hidden">
                            <img 
                                src="https://cdn3.ivivu.com/2019/06/an-sap-top-20-quan-an-ngon-sai-gon-b%E1%BA%A1n-nhat-dinh-phai-thu-ivivu-12.png" 
                                alt="Food spot" 
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-2">
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Quận 5</span>
                                <div className="flex items-center ml-auto">
                                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                    <span className="ml-1 text-sm font-medium">4.7</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quán C</h3>
                            <p className="text-gray-600 mb-4">Địa chỉ quán, Quận 5, TP. Hồ Chí Minh</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Lẩu</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Dimsum</span>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Hủ tiếu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedRestaurantsSection; 