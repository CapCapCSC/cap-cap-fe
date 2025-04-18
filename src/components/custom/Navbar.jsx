import { Button } from "@/components/ui/button"
import SearchBar from "./SearchBar"

function Navbar() {
    return (
        <nav className="bg-red-700 fixed w-full z-20 top-0 start-0 border-b border-[#F9AD2F]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold text-[#F9AD2F]">Cạp Cạp</span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="flex md:order-2">
                    <SearchBar />
                    <Button className="ml-6">Đăng nhập</Button>
                </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E69207] ">Bản đồ</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E69207]">Cuộc đua</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E69207]">Khoảnh khắc</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E69207]">Món ăn</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E69207]">Cửa hàng</a>
            </li>
            </ul>
        </div>
        </div>
        </nav>
    );
}

export default Navbar; 