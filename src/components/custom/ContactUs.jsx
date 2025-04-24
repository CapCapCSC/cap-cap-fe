import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";

function ContactUs() {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-lobster mb-6 text-gray-900">Liên Hệ</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Hãy liên hệ với chúng tôi nếu bạn có câu hỏi hoặc đề xuất
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
                        
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder="Nhập họ và tên của bạn"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder="Nhập địa chỉ email của bạn"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn</label>
                                <textarea 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors h-32 resize-none"
                                    placeholder="Nhập nội dung tin nhắn của bạn"
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                Gửi tin nhắn <Send size={16} />
                            </button>
                        </form>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 shrink-0">
                                        <Phone className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Điện thoại</h4>
                                        <p className="text-gray-600">+84 123 456 789</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 shrink-0">
                                        <Mail className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Email</h4>
                                        <p className="text-gray-600">capcap@gmail.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 shrink-0">
                                        <MapPin className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Địa chỉ</h4>
                                        <p className="text-gray-600">Khu phố 6, P.Linh Trung, TP.Thủ Đức, TP.HCM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-xl shadow-lg text-white">
                            <h3 className="text-2xl font-bold mb-4">Theo dõi Cạp Cạp</h3>
                            <p className="mb-6 opacity-90">Đừng bỏ lỡ những cập nhật và tin tức mới nhất từ chúng tôi</p>
                            <a 
                                href="#" 
                                className="inline-flex items-center bg-white text-red-600 hover:bg-gray-100 py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                Kết nối ngay <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs; 