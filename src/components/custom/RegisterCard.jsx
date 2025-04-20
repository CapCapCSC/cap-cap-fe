import { Button } from "@/components/ui/button"


const RegisterCard = ({ username, setUsername, email, setEmail, password, setPassword, confirmPasword, setConfirmPassword}) => {
    return(
        <div className="w-full mt-24 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
            <form className="space-y-6" action="#">
                <h5 className="text-2xl text-center font-medium text-red-700">Đăng ký</h5>
                {/* Username */}
                <div class="relative">
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="" required
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"/>
                    <label for="text" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tên đăng nhập</label>
                </div>
                {/* Email */}
                <div class="relative">
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"/>
                    <label for="email" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                </div>
                {/* Password */}
                <div class="relative">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"/>
                    <label for="password" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mật khẩu</label>
                </div>
                {/* Confirm Password */}
                <div class="relative">
                    <input type="password" name="confirm-password" id="confirm-password" value={confirmPasword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="" required
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"/>
                    <label for="password" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nhập lại mật khẩu</label>
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