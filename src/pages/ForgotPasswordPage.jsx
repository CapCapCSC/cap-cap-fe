import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const ForgotPasswordCard = ({ email, setEmail, onSubmit }) => {
    return (
        <div className="mt-44 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-700">Quên mật khẩu</h1>
                <p className="mt-2 text-gray-600">Nhập email của bạn để lấy lại mật khẩu</p>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="your@email.com"
                    />
                </div>
                
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Gửi liên kết đặt lại mật khẩu
                    </button>
                </div>
            </form>
            
            <div className="text-sm text-center">
                <a href="/login" className="font-medium text-red-600 hover:text-red-500">
                    Quay lại đăng nhập
                </a>
            </div>
        </div>
    );
};

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Here you would implement your API call to send reset email
        // For now, we'll simulate it with a toast message
        
        toast.success(
            "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.",
            {
                duration: 5000
            }
        );
        
        // In a real application, we might want to stay on this page
        // instead of redirecting immediately, since the user needs to
        // check their email. But for demo purposes we'll redirect after delay
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    };
    
    return (
        <div>
            <div className="mt-24 flex items-center justify-center">
                <ForgotPasswordCard 
                    email={email} 
                    setEmail={setEmail} 
                    onSubmit={handleSubmit} 
                />
            </div>
            <Toaster />
        </div>
    );
};

export default ForgotPasswordPage;