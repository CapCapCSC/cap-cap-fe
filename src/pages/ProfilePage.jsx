import { useState, useRef } from "react";
import Footer from "@/components/custom/Footer";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCamera } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

// Import badge images
import badge1 from "@/assets/badges/badge_1.png";
import badge2 from "@/assets/badges/badge_2.png";
import badge3 from "@/assets/badges/badge_3.png";
import badge4 from "@/assets/badges/badge_4.png";
import badge5 from "@/assets/badges/badge_5.png";
import badge6 from "@/assets/badges/badge_6.png";

// Tab enum for better readability
const TabType = {
    CHECKIN: 'checkin',
    BADGES: 'badges',
    VOUCHERS: 'vouchers',
    QUIZ: 'quiz'
};

const ProfilePage = () => {
    const { user } = useAuth();
    const isCurrentUser = !!user; // Check if this is the authenticated user
    
    // Mock user data - in a real app, this would come from your auth context/state
    const [userData, setUserData] = useState({
        name: "Bakugo Katsuki",
        bio: "You wanna talk about some big disparity? Lack of understanding? Dread? Guess what- I've long since taken all that crap to heart. And I've seen a real step toward progress, with all that. It might take some time, but some people I know are trying to push forward. Thanks anyway but, you can shove your sermon... ya nutsack-faced Handy-man!",
        avatar: "https://qph.cf2.quoracdn.net/main-qimg-c0216ecbc80f9481f1635325f770650e-lq",
        social: {
            instagram: "bakugo_katsuki",
            facebook: "Great Explosion Murder God Dynamight",
            email: "bakugo2004@gmail.com"
        }
    });

    // File input ref
    const fileInputRef = useRef(null);
    
    // State for avatar change modal
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    
    // State for badge modal
    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);
    
    // State for voucher modal
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    
    // Mock badges data
    const badges = [
        { 
            _id: "1", 
            name: "Chuyên gia ẩm thực", 
            iconUrl: badge1, 
            description: "Đánh giá 10 món ăn và viết review chi tiết"
        },
        { 
            _id: "2", 
            name: "Người mới", 
            iconUrl: badge2, 
            description: "Đã tham gia hệ thống"
        },
        { 
            _id: "3", 
            name: "Khách quen", 
            iconUrl: badge3, 
            description: "Check-in tại 5 nhà hàng khác nhau" 
        },
        { 
            _id: "4", 
            name: "Thực khách đam mê", 
            iconUrl: badge4, 
            description: "10 lần check-in trong 1 tháng" 
        },
        { 
            _id: "5", 
            name: "Người ảnh hưởng", 
            iconUrl: badge5, 
            description: "Bài đánh giá có hơn 50 lượt thích" 
        },
        { 
            _id: "6", 
            name: "Thượng khách", 
            iconUrl: badge6, 
            description: "Thành viên VIP của hệ thống" 
        }
    ];
    
    // Mock vouchers data
    const vouchers = [
        {
            _id: "v1",
            name: "Giảm giá 10%",
            validUntil: "2025-12-31T23:59:59.000Z",
            applicableRestaurants: [
                {
                    _id: "restaurantObjectId1",
                    name: "Nhà hàng A"
                }
            ],
            discountValue: 10,
            used: false
        },
        {
            _id: "v2",
            name: "Giảm giá 20%",
            validUntil: "2025-06-30T23:59:59.000Z",
            applicableRestaurants: [
                {
                    _id: "restaurantObjectId2",
                    name: "Nhà hàng B"
                }
            ],
            discountValue: 20,
            used: false
        },
        {
            _id: "v3",
            name: "Miễn phí món tráng miệng",
            validUntil: "2025-03-15T23:59:59.000Z",
            applicableRestaurants: [
                {
                    _id: "restaurantObjectId3",
                    name: "Nhà hàng C"
                },
                {
                    _id: "restaurantObjectId4",
                    name: "Nhà hàng D"
                }
            ],
            discountValue: 0,
            used: false
        }
    ];
    
    // Mock check-in history data
    const checkInsData = [
        { id: 1, date: "01/01/2025", location: "Ăn tại quán A" },
        { id: 2, date: "02/01/2025", location: "Ăn tại quán X" },
        { id: 3, date: "03/01/2025", location: "Ăn tại quán Y" },
        { id: 4, date: "04/01/2025", location: "Ăn tại quán Z" },
        { id: 5, date: "05/01/2025", location: "Ăn tại quán T" },
        { id: 6, date: "06/01/2025", location: "Ăn tại quán U" }
    ];
    
    // State to track active check-in
    const [activeCheckInId, setActiveCheckInId] = useState(1); // Default first item as active
    
    // State to track active tab
    const [activeTab, setActiveTab] = useState(TabType.CHECKIN);
    
    // State for quiz pagination
    const [quizCurrentPage, setQuizCurrentPage] = useState(1);
    const quizItemsPerPage = 3;
    const totalQuizPages = 2; // Mock total pages
    
    // Mock quiz history data
    const quizHistory = [
        {
            _id: "q1",
            quizId: "quiz123",
            userId: "user456",
            score: 8,
            correctAnswers: 8,
            totalQuestions: 10,
            timeSpent: 300,
            startedAt: "2024-04-24T10:00:00.000Z",
            completedAt: "2024-04-24T10:05:00.000Z",
            status: "completed",
            answers: [
                {
                    questionId: "question1",
                    selectedAnswer: "Paris",
                    isCorrect: true,
                    timeSpent: 30
                }
            ],
            rewards: {
                badge: "badge3",
                voucher: "v1"
            }
        },
        {
            _id: "q2",
            quizId: "quiz124",
            userId: "user456",
            score: 6,
            correctAnswers: 6,
            totalQuestions: 10,
            timeSpent: 450,
            startedAt: "2024-04-22T14:30:00.000Z",
            completedAt: "2024-04-22T14:37:30.000Z",
            status: "completed",
            answers: [
                {
                    questionId: "question2",
                    selectedAnswer: "Tokyo",
                    isCorrect: true,
                    timeSpent: 25
                }
            ],
            rewards: {
                badge: "badge1",
                voucher: null
            }
        },
        {
            _id: "q3",
            quizId: "quiz125",
            userId: "user456",
            score: 10,
            correctAnswers: 10,
            totalQuestions: 10,
            timeSpent: 240,
            startedAt: "2024-04-20T09:15:00.000Z",
            completedAt: "2024-04-20T09:19:00.000Z",
            status: "completed",
            answers: [
                {
                    questionId: "question3",
                    selectedAnswer: "Rome",
                    isCorrect: true,
                    timeSpent: 20
                }
            ],
            rewards: {
                badge: "badge5",
                voucher: "v2"
            }
        },
        {
            _id: "q4",
            quizId: "quiz126",
            userId: "user456",
            score: 7,
            correctAnswers: 7,
            totalQuestions: 10,
            timeSpent: 320,
            startedAt: "2024-04-18T16:20:00.000Z",
            completedAt: "2024-04-18T16:25:20.000Z",
            status: "completed",
            answers: [
                {
                    questionId: "question4",
                    selectedAnswer: "Madrid",
                    isCorrect: false,
                    timeSpent: 40
                }
            ],
            rewards: {
                badge: "badge2",
                voucher: "v3"
            }
        },
        {
            _id: "q5",
            quizId: "quiz127",
            userId: "user456",
            score: 9,
            correctAnswers: 9,
            totalQuestions: 10,
            timeSpent: 275,
            startedAt: "2024-04-15T08:10:00.000Z",
            completedAt: "2024-04-15T08:14:35.000Z",
            status: "completed",
            answers: [
                {
                    questionId: "question5",
                    selectedAnswer: "Berlin",
                    isCorrect: true,
                    timeSpent: 28
                }
            ],
            rewards: {
                badge: "badge4",
                voucher: null
            }
        }
    ];
    
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
            setUserData({
                ...userData,
                avatar: previewAvatar
            });
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

    // Render check-in history content
    const renderCheckInHistory = () => (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-1 bg-gray-200"></div>
            
            {/* Check-in items */}
            <div className="space-y-6">
                {checkInsData.map((checkIn) => (
                    <div key={checkIn.id} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-gray-600">{checkIn.date}</div>
                        <div 
                            onClick={() => handleCheckInClick(checkIn.id)}
                            className={`w-6 h-6 rounded-full z-10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${activeCheckInId === checkIn.id ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                        ></div>
                        <div className="flex-1">
                            {activeCheckInId === checkIn.id && 
                                <div className="text-md transition-opacity duration-200">{checkIn.location}</div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    // Render badges content
    const renderBadges = () => (
        <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Huy hiệu của bạn</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map(badge => (
                    <div key={badge._id} className="flex flex-col items-center">
                        <div 
                            className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-200"
                            onClick={() => handleBadgeClick(badge)}
                        >
                            <img 
                                src={badge.iconUrl} 
                                alt={badge.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-sm">{badge.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
    
    // Render vouchers content
    const renderVouchers = () => (
        <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Voucher của bạn</h3>
            <div className="space-y-4">
                {vouchers.map(voucher => {
                    // Format the date
                    const validUntil = new Date(voucher.validUntil);
                    const formattedDate = validUntil.toLocaleDateString('vi-VN');
                    
                    return (
                        <div 
                            key={voucher._id} 
                            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleVoucherClick(voucher)}
                        >
                            <div>
                                <h4 className="font-medium">{voucher.name}</h4>
                                <p className="text-sm text-gray-500">
                                    Áp dụng tại: {voucher.applicableRestaurants.map(r => r.name).join(', ')}
                                </p>
                                <p className="text-sm text-gray-500">Hết hạn: {formattedDate}</p>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
    
    // Render quiz history content
    const renderQuizHistory = () => {
        // Calculate pagination indices
        const startIndex = (quizCurrentPage - 1) * quizItemsPerPage;
        const endIndex = startIndex + quizItemsPerPage;
        // Get current page items
        const currentItems = quizHistory.slice(startIndex, endIndex);
        
        return (
            <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Lịch sử làm quiz</h3>
                <div className="space-y-4">
                    {currentItems.map(quiz => {
                        // Format dates
                        const startDate = new Date(quiz.startedAt);
                        const formattedDate = startDate.toLocaleDateString('vi-VN');
                        const formattedTime = startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                        
                        // Format time spent
                        const minutes = Math.floor(quiz.timeSpent / 60);
                        const seconds = quiz.timeSpent % 60;
                        const formattedTimeSpent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                        
                        // Get badge and voucher info
                        const badge = badges.find(b => b._id === quiz.rewards.badge);
                        const voucher = vouchers.find(v => v._id === quiz.rewards.voucher);
                        
                        return (
                            <div key={quiz._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between">
                                    <div>
                                        <h4 className="font-medium">Quiz #{quiz.quizId.substring(4)}</h4>
                                        <p className="text-sm text-gray-500">
                                            {formattedDate} - {formattedTime}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-red-600">
                                            {quiz.score}/{quiz.totalQuestions}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Thời gian: {formattedTimeSpent}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Rewards section */}
                                {(badge || voucher) && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <p className="text-sm font-medium mb-2">Phần thưởng:</p>
                                        <div className="flex items-center gap-3">
                                            {badge && (
                                                <div className="flex items-center gap-1">
                                                    <img src={badge.iconUrl} alt={badge.name} className="w-6 h-6 rounded-full" />
                                                    <span className="text-sm">{badge.name}</span>
                                                </div>
                                            )}
                                            {voucher && (
                                                <div 
                                                    className="flex items-center gap-1 text-sm bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100"
                                                    onClick={() => handleVoucherClick(voucher)}
                                                >
                                                    <span>🎫</span>
                                                    <span>{voucher.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => handleQuizPageChange(quizCurrentPage > 1 ? quizCurrentPage - 1 : 1)}
                            className={`px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 ${quizCurrentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={quizCurrentPage === 1}
                        >
                            &laquo;
                        </button>
                        <button 
                            onClick={() => handleQuizPageChange(1)}
                            className={`px-3 py-1 border border-gray-300 rounded ${quizCurrentPage === 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                        >
                            1
                        </button>
                        <button 
                            onClick={() => handleQuizPageChange(2)}
                            className={`px-3 py-1 border border-gray-300 rounded ${quizCurrentPage === 2 ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                        >
                            2
                        </button>
                        <button 
                            onClick={() => handleQuizPageChange(quizCurrentPage < totalQuizPages ? quizCurrentPage + 1 : totalQuizPages)}
                            className={`px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 ${quizCurrentPage === totalQuizPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={quizCurrentPage === totalQuizPages}
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    // Render active tab content
    const renderActiveTabContent = () => {
        switch (activeTab) {
            case TabType.BADGES:
                return renderBadges();
            case TabType.VOUCHERS:
                return renderVouchers();
            case TabType.QUIZ:
                return renderQuizHistory();
            case TabType.CHECKIN:
            default:
                return renderCheckInHistory();
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
                                <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                                {isCurrentUser && (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center bg-indigo-600/0 group-hover:bg-gray-500/30 group-hover:backdrop-blur-sm transition-all duration-300 cursor-pointer"
                                        onClick={handleAvatarChangeClick}
                                    >
                                        <IoMdCamera className="text-transparent group-hover:text-red-500 text-2xl transition-colors duration-300" />
                                    </div>
                                )}
                            </div>
                            
                            <h1 className="text-2xl font-bold text-center">{userData.name}</h1>
                            
                            {/* Bio as quote */}
                            <div className="mt-4 px-4 relative">
                                <div className="absolute top-0 left-0 text-gray-300 text-4xl font-serif">❝</div>
                                <p className="text-gray-600 text-center pt-4 px-4 pb-6 italic">
                                    {userData.bio}
                                </p>
                                <div className="absolute bottom-0 right-0 text-gray-300 text-4xl font-serif">❞</div>
                            </div>
                            
                            {/* Social links */}
                            <div className="w-full mt-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaInstagram className="text-pink-500 text-xl" />
                                    <span>{userData.social.instagram}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaFacebook className="text-blue-600 text-xl" />
                                    <span>{userData.social.facebook}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdEmail className="text-red-500 text-xl" />
                                    <span>{userData.social.email}</span>
                                </div>
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
            {isAvatarModalOpen && isCurrentUser && (
                <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm  flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-medium mb-4">Đổi avatar</h3>
                        
                        <div className="mb-4">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                                <img 
                                    src={previewAvatar || userData.avatar} 
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
        </div>
    );
};

export default ProfilePage;
