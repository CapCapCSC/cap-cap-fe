import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const LoginCard = ({ email, setEmail, password, setPassword, handleLogin, isLoading }) => {

    return(
        <div className="w-full mt-24 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
            <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-2xl text-center font-medium text-red-700">Đăng nhập</h5>
                {/* Email */}
                <div className="relative">
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="" 
                        required
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    />
                    <label 
                        htmlFor="email" 
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        Email
                    </label>
                </div>
                {/* Password */}
                <div className="relative">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="" 
                        required
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    />
                    <label 
                        htmlFor="password" 
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        Mật khẩu
                    </label>
                </div>

                {/* Remember Me */}
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 accent-red-700 bg-gray-100 border-red-300 rounded-sm focus:ring-blue-50" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Ghi nhớ đăng nhập</label>
                    </div>
                    <a href="/forgot-password" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Quên mật khẩu?</a>
                </div>
                {/* Button login */}
                <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    disabled={isLoading}
                > 
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Đang xử lý...
                        </>
                    ) : (
                        "Đăng nhập"
                    )}
                </Button>

                {/* Navigate to register page */}
                <div className="text-sm font-medium text-gray-500 ">
                    Chưa có tài khoản? <a href="/register" className="text-blue-700 hover:underline ">Đăng ký tài khoản mới</a>
                </div>
            </form>
        </div>
    );
}

export default LoginCard;