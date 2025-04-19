import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const menuItems = [
    { label: "Bản đồ", href: "/map" },
    { label: "Cuộc đua", href: "/contests" },
    { label: "Khoảnh khắc", href: "/moments" },
    { label: "Món ăn", href: "/foods" },
    { label: "Cửa hàng", href: "/restaurants" },
];


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-red-700 fixed w-full z-20 top-0 start-0 border-b border-[#F9AD2F]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold text-[#F9AD2F]">Cạp Cạp</span>
            </a>

            {/* Hamburger (mobile only) */}
            <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden inline-flex items-center p-2 text-white rounded-lg hover:bg-[#E69207]"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>

            {/* Collapse menu */}
            <div
            className={`w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}
            id="navbar-cta"
            >
            <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 rounded-lg md:space-x-8 bg-red-700 md:bg-transparent w-full items-center">
                {/* Mục menu chính */}
                    {menuItems.map(({ label, href }) => (
                    <li key={label}>
                        <a
                        href={href}
                        className="block py-2 px-3 text-gray-50 rounded hover:bg-[#E69207] active:bg-[#E69207] focus:bg-[#E69207] md:hover:bg-transparent md:hover:text-[#E69207]"
                        >
                        {label}
                        </a>
                    </li>
                ))}

                {/* Dành cho mobile */}
                <li className="md:hidden">
                    <Button onClick={() => navigate("/login")} className="mt-4 block py-2 px-3 text-white cursor-pointer">Đăng nhập</Button>
                </li>
                <li className="md:hidden">
                    <Button onClick={() => navigate("/register")} className="mt-4 block py-2 px-3 text-white cursor-pointer">Đăng ký</Button>
                </li>

                {/* Search + Đăng nhập/Đăng ký (desktop only) */}
                <li className="hidden md:flex items-center space-x-4 ml-auto">
                    <SearchBar />
                    <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
                    <Button onClick={() => navigate("/register")}>Đăng ký</Button>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}
