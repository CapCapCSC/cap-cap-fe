import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import API from "@/services/api";

const ForgotPasswordCard = ({ email, setEmail, onSubmit, isLoading }) => {
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
                        disabled={isLoading}
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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Vui lòng nhập email của bạn");
            return;
        }
        
        try {
            setIsLoading(true);
            await authService.forgotPassword(email);
            
            toast.success(
                "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.",
                {
                    duration: 5000
                }
            );
            
            // Redirect to login page after a delay
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (error) {
            console.error("Error sending reset password email:", error);
            toast.error(error.message || "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <div className="mt-24 flex items-center justify-center">
                <ForgotPasswordCard 
                    email={email} 
                    setEmail={setEmail} 
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
            
            <Toaster />
        </div>
    );
};

export default ForgotPasswordPage;