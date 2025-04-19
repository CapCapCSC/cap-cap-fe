import { Button } from "@/components/ui/button"


const RegisterCard = ({ username, setUsername, email, setEmail, password, setPassword}) => {
    return(
        <div className="w-full mt-24 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
            <form className="space-y-6" action="#">
                <h5 className="text-2xl text-center font-medium text-red-700">Đăng ký</h5>
                {/* Username */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="your username" required />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                </div>
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>

                {/* Button login */}
                <Button type="submit" variant="primary" className="w-full" onClick={() => toast("Đăng ký thành công!!! 🎉🎉🎉")}> Đăng ký </Button>

                {/* Navigate to register page */}
                <div className="text-sm font-medium text-gray-500 ">
                    Đã có tài khoản? <a href="/login" className="text-blue-700 hover:underline ">Bấm vào đây để đăng nhập</a>
                </div>
            </form>
        </div>
    );
}

export default RegisterCard;