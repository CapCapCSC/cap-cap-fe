import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { CgLogOut } from "react-icons/cg";

const menuItems = [
    { label: "Bản đồ", href: "/map" },
    { label: "Cuộc đua", href: "/contests" },
    { label: "Khoảnh khắc", href: "/moments" },
    { label: "Món ăn", href: "/foods" },
    { label: "Cửa hàng", href: "/restaurants" },
];

export function AuthenticatedNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    
    // Mock user data - in a real app, this would come from your auth context/state
    const currentUser = {
        name: "User Name",
        avatar: "https://qph.cf2.quoracdn.net/main-qimg-c0216ecbc80f9481f1635325f770650e-lq" // If you have an avatar URL, you can use it here
    };
    
    const handleLogout = () => {
        // Add your logout logic here, such as clearing tokens, auth state, etc.
        // Then navigate to login page
        navigate("/");
    };
    
    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        
        // Add event listener when dropdown is open
        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileOpen]);

    return (
        <nav className="bg-red-700 fixed w-full z-50 top-0 start-0 border-b border-[#F9AD2F]">
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

                {/* Dành cho mobile - User profile icon */}
                <li className="md:hidden flex justify-center w-full relative">
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)} 
                            className="mt-4 rounded-full bg-slate-200 w-10 h-10 flex items-center justify-center overflow-hidden"
                        >
                            {currentUser.avatar ? (
                                <img src={currentUser.avatar} alt="User" className="w-10 h-10 object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Mobile Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                {/* User info section */}
                                <div 
                                    onClick={() => { 
                                        navigate("/profile");
                                        setIsProfileOpen(false);
                                    }}
                                    className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {/* Avatar */}
                                    <div className="rounded-full bg-slate-300 w-8 h-8 flex items-center justify-center">
                                        {currentUser.avatar ? (
                                            <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-gray-800 font-medium">{currentUser.name}</span>
                                </div>
                                
                                {/* Divider */}
                                <hr className="my-1" />
                                
                                {/* Logout option */}
                                <div 
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                </li>

                {/* Search + User profile icon (desktop only) */}
                <li className="hidden md:flex items-center space-x-4 ml-auto relative">
                    <SearchBar />
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)} 
                            className="cursor-pointer rounded-full bg-slate-200 w-10 h-10 flex items-center justify-center overflow-hidden"
                        >
                            {currentUser.avatar ? (
                                <img src={currentUser.avatar} alt="User" className="w-10 h-10 object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                {/* User info section */}
                                <div 
                                    onClick={() => { 
                                        navigate("/profile");
                                        setIsProfileOpen(false);
                                    }}
                                    className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {/* Avatar */}
                                    <div className="rounded-full bg-slate-300 w-8 h-8 flex items-center justify-center">
                                        {currentUser.avatar ? (
                                            <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-gray-800 font-medium">{currentUser.name}</span>
                                </div>
                                
                                {/* Divider */}
                                <hr className="my-1" />
                                
                                {/* Logout option */}
                                <div 
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                >
                                    <CgLogOut className="w-5 h-5"/>
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-red-700 fixed w-full z-50 top-0 start-0 border-b border-[#F9AD2F]">
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
