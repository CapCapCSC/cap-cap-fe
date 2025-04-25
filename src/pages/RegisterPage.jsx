import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import Navbar from '@/components/custom/Navbar';
import RegisterCard from "@/components/custom/RegisterCard";
import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!username || !email || !password || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
            return;
        }
        
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const userData = await authService.register({ username, email, password });
            
            toast.success("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...");
            login(userData.user);
            
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            toast.error(error.message || "Đăng ký thất bại, vui lòng thử lại sau");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='mt-24 flex items-center justify-center'>
                <RegisterCard
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    handleRegister={handleRegister}
                    isLoading={isLoading}
                />
            </div>
            <Toaster />
        </div>
    );
}

export default RegisterPage;