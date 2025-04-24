import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, ChevronDown, X } from "lucide-react";
import HCMMap from "@/components/custom/HCMMap";

// Demo data
const restaurants = [
    {
        id: 1,
        imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
        name: "Quán A",
        locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
        address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
        districtId: "quan-1",
        menu: [
            {
                food: {
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000
            }
        ]
    },
    {
        id: 2,
        imageUrl: "https://vuongquocden.vn/wp-content/uploads/2022/08/thiet-ke-quan-an-vat.jpg",
        name: "Quán B",
        locationUrl: "https://maps.google.com/?q=10.772622,106.680172",
        address: "456 Điện Biên Phủ, Quận 3, TP.HCM",
        districtId: "quan-3",
        menu: [
            {
                food: {
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000
            }
        ]
    },
    {
        id: 3,
        imageUrl: "https://websitecukcuk.com/blog/wp-content/uploads/2020/04/Thiet-ke-quan-an-vat-nhu-the-nao-de-thu-hut-khach-hang-4.jpg",
        name: "Quán C",
        locationUrl: "https://maps.google.com/?q=10.752622,106.670172",
        address: "789 Võ Thị Sáu, Quận 3, TP.HCM",
        districtId: "quan-3",
        menu: [
            {
                food: {
                    name: "Gỏi xoài tôm khô",
                    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
                },
                price: 45000
            }
        ]
    },
    {
        id: 4,
        imageUrl: "https://kientrucmynghe.com.vn/wp-content/uploads/2022/05/thiet-ke-quan-an-san-vuon-8jpg-scaled.jpg",
        name: "Quán D",
        locationUrl: "https://maps.google.com/?q=10.782622,106.650172",
        address: "321 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
        districtId: "quan-binh-thanh",
        menu: [
            {
                food: {
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000
            }
        ]
    },
    {
        id: 5,
        imageUrl: "https://cdn.thietkenoithat.com/images/upload/images/thiet-ke-quan-cafe-san-vuon-thu-hut-view-dep-khach-se-do-ve(1).jpg",
        name: "Quán E",
        locationUrl: "https://maps.google.com/?q=10.792622,106.690172",
        address: "159 Nguyễn Văn Linh, Quận 7, TP.HCM",
        districtId: "quan-7",
        menu: [
            {
                food: {
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000
            }
        ]
    },
];

const districts = [
    { id: "all", name: "Tất cả quận" },
    { id: "quan-1", name: "Quận 1" },
    { id: "quan-3", name: "Quận 3" },
    { id: "quan-7", name: "Quận 7" },
    { id: "quan-binh-thanh", name: "Quận Bình Thạnh" },
    { id: "quan-9", name: "Quận 9" },
];

const sortOptions = [
    { id: "relevance", name: "Mức độ phù hợp" },
    { id: "price-low", name: "Giá: Thấp đến cao" },
    { id: "price-high", name: "Giá: Cao đến thấp" },
];

const RestaurantListPage = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("all");
    const [selectedSort, setSelectedSort] = useState("relevance");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // grid or map

    // Filter restaurants based on selected district and search query
    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesDistrict = selectedDistrict === "all" || restaurant.districtId === selectedDistrict;
        const matchesSearch = searchQuery === "" || 
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesDistrict && matchesSearch;
    });

    // Sort restaurants based on selected sort option
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
        switch (selectedSort) {
            case "price-low":
                return a.menu[0].price - b.menu[0].price;
            case "price-high":
                return b.menu[0].price - a.menu[0].price;
            default:
                return 0;
        }
    });

    // Add a filter
    const addFilter = (type, value) => {
        if (!activeFilters.find(f => f.type === type && f.value === value)) {
            setActiveFilters([...activeFilters, { type, value }]);
        }
    };

    // Remove a filter
    const removeFilter = (type, value) => {
        setActiveFilters(activeFilters.filter(f => !(f.type === type && f.value === value)));
    };

    // Restaurant card component
    const RestaurantCard = ({ restaurant }) => (
        <Link to={`/restaurants/${restaurant.id}`} className="group block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 overflow-hidden relative">
                <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-800">{restaurant.name}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{restaurant.address}</span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Hero Section with search */}
            <div className="mt-16 relative bg-gradient-to-r from-red-700 to-red-500 text-white">
                <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Khám phá nhà hàng tại TP.HCM</h1>
                        <p className="text-red-100 mb-8">Tìm kiếm các nhà hàng ngon nhất với các món ăn đặc sắc tại Thành phố Hồ Chí Minh</p>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm nhà hàng..." 
                                className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 shadow-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>
            
            {/* Main content */}
            <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-10">
                {/* Filter bar */}
                <div className="bg-white shadow-md rounded-xl mb-8 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <Filter className="h-5 w-5" />
                                <span>Lọc</span>
                            </button>
                            
                            <div className="relative">
                                <button 
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    onClick={() => setSelectedDistrict("all")}
                                >
                                    <span>{districts.find(d => d.id === selectedDistrict)?.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {/* Dropdown would go here in a real implementation */}
                            </div>
                            
                            <div className="relative hidden sm:block">
                                <button 
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <span>{sortOptions.find(o => o.id === selectedSort)?.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {/* Dropdown would go here in a real implementation */}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-gray-100"}`}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => setViewMode("map")}
                                className={`p-2 rounded-lg ${viewMode === "map" ? "bg-red-500 text-white" : "bg-gray-100"}`}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Active filters */}
                    {activeFilters.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {activeFilters.map((filter, index) => (
                                <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm">
                                    <span>{filter.value}</span>
                                    <button 
                                        onClick={() => removeFilter(filter.type, filter.value)}
                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={() => setActiveFilters([])}
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Xóa tất cả
                            </button>
                        </div>
                    )}
                    
                    {/* Expanded filter options */}
                    {isFilterOpen && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">Quận/Huyện</h3>
                                    <div className="space-y-2">
                                        {districts.map((district) => (
                                            <div key={district.id} className="flex items-center">
                                                <input 
                                                    type="radio" 
                                                    id={district.id} 
                                                    name="district" 
                                                    checked={selectedDistrict === district.id}
                                                    onChange={() => setSelectedDistrict(district.id)}
                                                    className="h-4 w-4 text-red-600"
                                                />
                                                <label htmlFor={district.id} className="ml-2 text-sm text-gray-700">
                                                    {district.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Sắp xếp theo</h3>
                                    <div className="space-y-2">
                                        {sortOptions.map((option) => (
                                            <div key={option.id} className="flex items-center">
                                                <input 
                                                    type="radio" 
                                                    id={option.id} 
                                                    name="sort" 
                                                    checked={selectedSort === option.id}
                                                    onChange={() => setSelectedSort(option.id)}
                                                    className="h-4 w-4 text-red-600"
                                                />
                                                <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                                                    {option.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button 
                                    onClick={() => setIsFilterOpen(false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Map view */}
                {viewMode === "map" && (
                    <div className="rounded-xl overflow-hidden shadow-md bg-white mb-8 h-[500px]">
                        <HCMMap />
                    </div>
                )}
                
                {/* Grid view */}
                {viewMode === "grid" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedDistrict === "all" 
                                    ? "Tất cả nhà hàng" 
                                    : `Nhà hàng tại ${districts.find(d => d.id === selectedDistrict)?.name}`}
                            </h2>
                            <span className="text-gray-500 text-sm">{sortedRestaurants.length} nhà hàng</span>
                        </div>
                        
                        {sortedRestaurants.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedRestaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy nhà hàng</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Không tìm thấy nhà hàng phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với bộ lọc khác.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantListPage;