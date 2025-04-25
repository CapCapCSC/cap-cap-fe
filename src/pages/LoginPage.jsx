import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import Navbar from '@/components/custom/Navbar';
import LoginCard from '../components/custom/LoginCard';
import { authService } from '@/services/authService';
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!email || !password) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const userData = await authService.login({ email, password });
            
            toast.success("Đăng nhập thành công!");
            login(userData.user);
            
            // Redirect to home page after successful login
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            toast.error(error.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            <Navbar />
            <div className='mt-24 flex items-center justify-center'>
                <LoginCard
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                />
            </div>
            <Toaster />
        </div>
    );
}

export default LoginPage;