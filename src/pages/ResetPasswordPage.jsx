import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordCard = ({ 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    onSubmit, 
    token,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword
}) => {
    return (
        <div className="mt-44 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-700">Đặt lại mật khẩu</h1>
                <p className="mt-2 text-gray-600">Tạo mật khẩu mới cho tài khoản của bạn</p>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-6">
                <input type="hidden" name="token" value={token} />
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Mật khẩu mới
                    </label>
                    <div className="mt-1 relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-10"
                            placeholder="••••••••"
                            style={{ 
                                "WebkitTextSecurity": showPassword ? "none" : "disc",
                                "appearance": "none"
                            }}
                        />
                        <button 
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Xác nhận mật khẩu
                    </label>
                    <div className="mt-1 relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-10"
                            placeholder="••••••••"
                            style={{ 
                                "WebkitTextSecurity": showConfirmPassword ? "none" : "disc",
                                "appearance": "none"
                            }}
                        />
                        <button 
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={toggleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>
                
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Đặt lại mật khẩu
                    </button>
                </div>
            </form>
        </div>
    );
};

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidToken, setIsValidToken] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    
    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);
    
    // Verify token is valid when component loads
    useEffect(() => {
        // In a real app, you would validate the token with your backend
        // This is a placeholder for that validation
        const validateToken = async () => {
            try {
                // Simulating token validation
                if (!token) {
                    setIsValidToken(false);
                    toast.error("Token không hợp lệ");
                    setTimeout(() => navigate("/forgot-password"), 2000);
                }
                
                // You would typically make an API call here
                // const response = await fetch('/api/validate-token', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ token })
                // });
                
                // if (!response.ok) {
                //   setIsValidToken(false);
                //   toast.error("Token không hợp lệ hoặc đã hết hạn");
                //   setTimeout(() => navigate("/forgot-password"), 2000);
                // }
            } catch (error) {
                console.error("Error validating token:", error);
                setIsValidToken(false);
                toast.error("Đã xảy ra lỗi khi xác thực token");
                setTimeout(() => navigate("/forgot-password"), 2000);
            }
        };
        
        validateToken();
    }, [token, navigate]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isValidToken) {
            toast.error("Token không hợp lệ hoặc đã hết hạn");
            return;
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp!");
            return;
        }
        
        // Check if password is strong enough
        if (password.length < 8) {
            toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
            return;
        }
        
        // Here you would implement your API call to reset the password
        // For example:
        // fetch('/api/reset-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token, password })
        // })
        
        toast.success("Đặt lại mật khẩu thành công!");
        
        // Redirect to login page after successful password reset
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };
    
    if (!isValidToken) {
        return (
            <div className="mt-24 flex items-center justify-center">
                <div className="text-center">
                    <p>Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</p>
                    <p>Đang chuyển hướng đến trang quên mật khẩu...</p>
                </div>
                <Toaster />
            </div>
        );
    }
    
    return (
        <div>
            <div className="mt-24 flex items-center justify-center">
                <ResetPasswordCard 
                    password={password} 
                    setPassword={setPassword} 
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onSubmit={handleSubmit}
                    token={token}
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    toggleShowConfirmPassword={toggleShowConfirmPassword}
                />
            </div>
            <Toaster />
        </div>
    );
};

export default ResetPasswordPage;
