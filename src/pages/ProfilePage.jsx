import { useState, useRef, useEffect } from "react";
import Footer from "@/components/custom/Footer";
import { FaInstagram, FaFacebook, FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCamera } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import userService from "@/services/userService";
import CheckInHistory from "@/components/custom/ProfileTabs/CheckInHistory";
import BadgesList from "@/components/custom/ProfileTabs/BadgesList";
import VouchersList from "@/components/custom/ProfileTabs/VouchersList";
import QuizHistory from "@/components/custom/ProfileTabs/QuizHistory";

// Tab enum for better readability
const TabType = {
    CHECKIN: 'checkin',
    BADGES: 'badges',
    VOUCHERS: 'vouchers',
    QUIZ: 'quiz'
};

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, updateUserProfile } = useAuth();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    // Initialize state for UI components
    const [activeTab, setActiveTab] = useState(TabType.CHECKIN);
    const [activeCheckInId, setActiveCheckInId] = useState(1);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [quizCurrentPage, setQuizCurrentPage] = useState(1);
    const quizItemsPerPage = 3;
    const totalQuizPages = 2;
    
    const fileInputRef = useRef(null);

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    // Removed mock data arrays and added state hooks for API data
    const [badges, setBadges] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [checkInsData, setCheckInsData] = useState([]);
    const [quizHistory, setQuizHistory] = useState([]);

    const isOwnProfile = currentUser && currentUser.id === id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await userService.getUserById(id);
                setUser(userData);
                setFormData({
                    username: userData.username,
                    email: userData.email,
                    avatar: userData.avatar,
                });
                setNewUsername(userData.username);
                setBadges(userData.badges || []);
                setVouchers(userData.vouchers || []);
                setCheckInsData(userData.checkIns || userData.checkInsData || []);
                setQuizHistory(userData.quizHistory || []);
            } catch (error) {
                toast.error(error.message || "Failed to fetch user data");
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isOwnProfile) {
            toast.error("You can only edit your own profile");
            return;
        }
        
        // Validate formData fields according to schema requirements
        const errors = [];
        
        if (formData.username && (formData.username.length < 3 || formData.username.length > 30)) {
            errors.push("Username must be between 3 and 30 characters");
        }
        
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.push("Please enter a valid email address");
        }
        
        if (formData.password && (formData.password.length < 6 || formData.password.length > 30)) {
            errors.push("Password must be between 6 and 30 characters");
        }
        
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }
        
        // Only include fields that have changed
        const changedData = {};
        if (formData.username !== user.username) changedData.username = formData.username;
        if (formData.email !== user.email) changedData.email = formData.email;
        if (formData.password) changedData.password = formData.password;
        
        // Don't submit if nothing has changed
        if (Object.keys(changedData).length === 0) {
            toast.info("No changes to save");
            setEditing(false);
            return;
        }
        
        try {
            await updateUserProfile(id, changedData);
            toast.success("Profile updated successfully");
            setEditing(false);
        } catch (error) {
            toast.error(error.message || "Failed to update profile");
            console.error("Error updating profile:", error);
        }
    };

    if (loading) {
        return <div className="container mt-32 flex justify-center">Loading profile...</div>;
    }

    if (!user) {
        return <div className="container mt-32 flex justify-center">User not found</div>;
    }
    
    // Handle click on check-in circle
    const handleCheckInClick = (id) => {
        setActiveCheckInId(id);
    };
    
    // Handle avatar change click
    const handleAvatarChangeClick = () => {
        setIsAvatarModalOpen(true);
    };
    
    // Handle badge click
    const handleBadgeClick = (badge) => {
        setSelectedBadge(badge);
        setIsBadgeModalOpen(true);
    };
    
    // Handle close badge modal
    const handleCloseBadgeModal = () => {
        setIsBadgeModalOpen(false);
    };
    
    // Handle voucher click
    const handleVoucherClick = (voucher) => {
        setSelectedVoucher(voucher);
        setIsVoucherModalOpen(true);
    };
    
    // Handle close voucher modal
    const handleCloseVoucherModal = () => {
        setIsVoucherModalOpen(false);
    };
    
    // Handle use voucher
    const handleUseVoucher = () => {
        // In a real app, this would call an API to mark the voucher as used
        if (selectedVoucher && !selectedVoucher.used) {
            // For now, just close the modal
            setIsVoucherModalOpen(false);
            // Add your logic to use the voucher here
        }
    };
    
    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Handle confirm avatar change
    const handleConfirmAvatarChange = () => {
        if (previewAvatar) {
            setUser(prevUser => ({
                ...prevUser,
                avatar: previewAvatar
            }));
        }
        setIsAvatarModalOpen(false);
        setPreviewAvatar(null);
    };
    
    // Handle cancel avatar change
    const handleCancelAvatarChange = () => {
        setIsAvatarModalOpen(false);
        setPreviewAvatar(null);
    };

    // Handle page change for quiz history
    const handleQuizPageChange = (pageNumber) => {
        setQuizCurrentPage(pageNumber);
    };

    const handleUsernameEditStart = () => {
        setIsEditingUsername(true);
    };

    const handleUsernameEditCancel = () => {
        setIsEditingUsername(false);
        setNewUsername(user.username); // Reset to current username
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        
        if (!newUsername.trim()) {
            toast.error("Username cannot be empty");
            return;
        }
        
        if (newUsername.length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }
        
        if (newUsername.length > 30) {
            toast.error("Username cannot exceed 30 characters");
            return;
        }
        
        try {
            // Create update data - only include username
            const updatedData = {
                username: newUsername,
                email: user.email
            };
            
            await updateUserProfile(id, updatedData);
            
            setUser((prevState) => ({
                ...prevState,
                username: newUsername
            }));
            
            setFormData((prevFormData) => ({
                ...prevFormData,
                username: newUsername
            }));
            
            setIsEditingUsername(false);
            toast.success("Username updated successfully");
        } catch (error) {
            toast.error(error.message || "Failed to update username");
            console.error("Error updating username:", error);
        }
    };

    // Removed inline renderCheckInHistory, renderBadges, renderVouchers, renderQuizHistory and replaced with component-based rendering
    const renderActiveTabContent = () => {
        switch (activeTab) {
            case TabType.CHECKIN:
                return <CheckInHistory checkInsData={checkInsData} activeCheckInId={activeCheckInId} handleCheckInClick={handleCheckInClick} />;
            case TabType.BADGES:
                return <BadgesList badges={badges} handleBadgeClick={handleBadgeClick} />;
            case TabType.VOUCHERS:
                return <VouchersList vouchers={vouchers} handleVoucherClick={handleVoucherClick} />;
            case TabType.QUIZ:
            default:
                return <QuizHistory quizHistory={quizHistory} badges={badges} vouchers={vouchers} quizCurrentPage={quizCurrentPage} quizItemsPerPage={quizItemsPerPage} totalQuizPages={totalQuizPages} handleQuizPageChange={handleQuizPageChange} handleVoucherClick={handleVoucherClick} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-32 max-w-screen-xl mx-auto px-4 w-full ">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile info card */}
                    <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 border border-gray-100">
                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 relative group">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-3xl font-semibold text-red-500">
                                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                )}
                                {isOwnProfile && (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center bg-indigo-600/0 group-hover:bg-gray-500/30 group-hover:backdrop-blur-sm transition-all duration-300 cursor-pointer"
                                        onClick={handleAvatarChangeClick}
                                    >
                                        <IoMdCamera className="text-transparent group-hover:text-red-500 text-2xl transition-colors duration-300" />
                                    </div>
                                )}
                            </div>
                            
                            {isEditingUsername ? (
                                <form onSubmit={handleUsernameSubmit} className="w-full max-w-xs mb-4">
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={handleUsernameChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            placeholder="Enter new username"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={handleUsernameEditCancel}
                                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-center mb-4">
                                    <h1 className="text-2xl font-bold text-center">{user.username}</h1>
                                    {isOwnProfile && (
                                        <button 
                                            onClick={handleUsernameEditStart} 
                                            className="ml-2 text-gray-500 hover:text-red-600"
                                            title="Edit username"
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </div>
                            )}
                            
                            {/* Bio as quote */}
                            <div className="mt-4 px-4 relative">
                                <div className="absolute top-0 left-0 text-gray-300 text-4xl font-serif">❝</div>
                                <p className="text-gray-600 text-center pt-4 px-4 pb-6 italic">
                                    {user.bio || "No bio available"}
                                </p>
                                <div className="absolute bottom-0 right-0 text-gray-300 text-4xl font-serif">❞</div>
                            </div>
                            
                            {/* Social links */}
                            <div className="w-full mt-6 space-y-3">
                                {user.email && (
                                    <>
                                        {user.email && (
                                            <div className="flex items-center gap-3">
                                                <MdEmail className="text-red-500 text-xl" />
                                                <span>{user.email}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* User activity container */}
                    <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/3 border border-gray-100">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <button 
                                onClick={() => setActiveTab(TabType.CHECKIN)}
                                className={`px-6 py-2 rounded-md hover:bg-red-700 hover:text-white transition-colors cursor-pointer ${
                                    activeTab === TabType.CHECKIN 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                Lịch sử checkin
                            </button>
                            <button 
                                onClick={() => setActiveTab(TabType.BADGES)}
                                className={`px-6 py-2 rounded-md hover:bg-red-700 hover:text-white transition-colors cursor-pointer ${
                                    activeTab === TabType.BADGES 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                Huy hiệu
                            </button>
                            <button 
                                onClick={() => setActiveTab(TabType.VOUCHERS)}
                                className={`px-6 py-2 rounded-md hover:bg-red-700 hover:text-white transition-colors cursor-pointer ${
                                    activeTab === TabType.VOUCHERS 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                Voucher
                            </button>
                            <button 
                                onClick={() => setActiveTab(TabType.QUIZ)}
                                className={`px-6 py-2 rounded-md hover:bg-red-700 hover:text-white transition-colors cursor-pointer ${
                                    activeTab === TabType.QUIZ 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                Lịch sử quiz
                            </button>
                        </div>
                        
                        {/* Tab content */}
                        {renderActiveTabContent()}
                    </div>
                </div>
            </div>
            
            {/* Avatar change modal - only accessible to authenticated users */}
            {isAvatarModalOpen && isOwnProfile && (
                <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm  flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-medium mb-4">Đổi avatar</h3>
                        
                        <div className="mb-4">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                                <img 
                                    src={previewAvatar || user.avatar || "https://via.placeholder.com/100"} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="text-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <button 
                                    onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Chọn ảnh
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button 
                                onClick={handleCancelAvatarChange}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleConfirmAvatarChange}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                disabled={!previewAvatar}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Badge modal */}
            {isBadgeModalOpen && selectedBadge && (
                <div className="fixed inset-0  bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium">{selectedBadge.name}</h3>
                            <button 
                                onClick={handleCloseBadgeModal}
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-200 shadow-lg mb-4">
                                <img 
                                    src={selectedBadge.iconUrl} 
                                    alt={selectedBadge.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <p className="text-center text-gray-600 mt-2">
                                {selectedBadge.description}
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <button 
                                onClick={handleCloseBadgeModal}
                                className="cursor-pointer px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Voucher modal */}
            {isVoucherModalOpen && selectedVoucher && (
                <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium">{selectedVoucher.name}</h3>
                            <button 
                                onClick={handleCloseVoucherModal}
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <div className="text-center mb-2">
                                    <span className="text-3xl">🎫</span>
                                </div>
                                <div className="text-center text-2xl font-bold text-blue-600">
                                    {selectedVoucher.discountValue > 0 
                                        ? `Giảm ${selectedVoucher.discountValue}%` 
                                        : selectedVoucher.name
                                    }
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium">Áp dụng tại: </span>
                                    <span>{selectedVoucher.applicableRestaurants.map(r => r.name).join(', ')}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Hết hạn: </span>
                                    <span>{new Date(selectedVoucher.validUntil).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Trạng thái: </span>
                                    <span className={selectedVoucher.used ? "text-gray-500" : "text-green-600"}>
                                        {selectedVoucher.used ? "Đã sử dụng" : "Có thể sử dụng"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-3">
                            <button 
                                onClick={handleCloseVoucherModal}
                                className="cursor-pointer px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Đóng
                            </button>
                            <button 
                                onClick={handleUseVoucher}
                                className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectedVoucher.used}
                            >
                                Sử dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex-grow"></div>
            <Footer />
            <Toaster />
        </div>
    );
};

export default ProfilePage;
