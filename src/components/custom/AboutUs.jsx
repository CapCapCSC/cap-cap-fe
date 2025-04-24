import { BookOpen, Utensils, Users } from 'lucide-react';

function AboutUs() {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-700 to-red-800 text-white">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-lobster mb-6">Về Cạp Cạp</h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl mb-4 leading-relaxed text-white/90">
                        Kết nối giáo dục và văn hóa ẩm thực trong một trải nghiệm độc đáo
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400/20 rounded-full"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500/30 rounded-full"></div>
                        <div className="relative bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
                            <p className="text-lg leading-relaxed mb-6">
                                <span className="text-yellow-400 font-bold">"Cạp cạp"</span> là dự án phát triển ứng dụng Web kết hợp giữa hai yếu tố: Giáo dục và Văn hóa (cụ thể tập trung vào Văn hóa Ẩm thực).
                            </p>
                            <p className="text-lg leading-relaxed">
                                Ứng dụng sẽ cho phép người dụng, đặc biệt là sinh viên, khám phá và học tập các giá trị văn hóa ẩm thực nước nhà thông qua các bài Quiz kiến thức, cũng như tìm các quán ăn để có thể trải nghiệm trực tiếp.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid gap-6">
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex">
                            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mr-4 shrink-0">
                                <Utensils className="text-red-800" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Văn hóa ẩm thực</h3>
                                <p className="text-white/80">Khám phá nét đẹp văn hóa qua ẩm thực đa dạng của Việt Nam</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex">
                            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mr-4 shrink-0">
                                <BookOpen className="text-red-800" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Kiến thức qua trải nghiệm</h3>
                                <p className="text-white/80">Học hỏi giá trị văn hóa qua việc trải nghiệm thực tế và các bài Quiz</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex">
                            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mr-4 shrink-0">
                                <Users className="text-red-800" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Cộng đồng sinh viên</h3>
                                <p className="text-white/80">Kết nối sinh viên yêu thích ẩm thực và di sản văn hóa Việt Nam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs; 