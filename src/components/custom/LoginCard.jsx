
import { Button } from "@/components/ui/button"

const LoginCard = ({ email, setEmail, password, setPassword }) => {

    return(
        <div className="w-full mt-24 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
            <form className="space-y-6" action="#">
                <h5 className="text-2xl text-center font-medium text-red-700">Đăng nhập</h5>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="name@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>

                {/* Remember Me */}
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 accent-red-700 bg-gray-100 border-red-300 rounded-sm focus:ring-blue-50" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Ghi nhớ đăng nhập</label>
                    </div>
                    <a href="/forgot-password" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Quên mật khẩu?</a>
                </div>
                {/* Button login */}
                <Button type="submit" variant="primary" className="w-full"> Đăng nhập </Button>

                {/* Navigate to register page */}
                <div className="text-sm font-medium text-gray-500 ">
                    Chưa có tài khoản? <a href="/register" className="text-blue-700 hover:underline ">Đăng ký tài khoản mới</a>
                </div>
            </form>
        </div>
    );
}

export default LoginCard;