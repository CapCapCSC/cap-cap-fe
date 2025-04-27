import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, ChevronDown, X } from "lucide-react";
import HCMMap from "@/components/custom/HCMMap";
import { getRestaurants, createRestaurant } from "@/services/restaurantService";
import { IoMdAddCircle } from "react-icons/io";
import { useAdmin } from "../context/AdminContext";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

const districts = [
    { id: "all", name: "Tất cả quận" },
    { id: "quan1", name: "Quận 1" },
    { id: "quan2", name: "Quận 2" },
    { id: "quan3", name: "Quận 3" },
    { id: "quan4", name: "Quận 4" },
    { id: "quan5", name: "Quận 5" },
    { id: "quan6", name: "Quận 6" },
    { id: "quan7", name: "Quận 7" },
    { id: "quan8", name: "Quận 8" },
    { id: "quan9", name: "Quận 9" },
    { id: "quan10", name: "Quận 10" },
    { id: "quan11", name: "Quận 11" },
    { id: "quan12", name: "Quận 12" },
    { id: "binhthanh", name: "Quận Bình Thạnh" },
    { id: "tanbinh", name: "Quận Tân Bình" },
    { id: "tanphu", name: "Quận Tân Phú" },
    { id: "phunhuan", name: "Quận Phú Nhuận" },
    { id: "govap", name: "Quận Gò Vấp" },
    { id: "binhtan", name: "Quận Bình Tân" },
    { id: "thuduc", name: "Quận Thủ Đức" },
];

const RestaurantListPage = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("all");
    const [selectedSort, setSelectedSort] = useState("relevance");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [newRestaurant, setNewRestaurant] = useState({
        name: "",
        imageUrl: "",
        districtId: districts[1].id,
        locationUrl: "",
        menu: [{ food: "", price: 0 }],
    });

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await getRestaurants(currentPage, itemsPerPage, selectedDistrict !== "all" ? selectedDistrict : undefined);
                const { total, limit } = response.pagination;
                setRestaurants(response.data);
                setTotalPages(Math.ceil(total / limit));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [currentPage, selectedDistrict]);

    const { isAdmin } = useAdmin();

    const handleAddRestaurant = async () => {
        try {
            await createRestaurant(newRestaurant);
            const response = await getRestaurants();
            setRestaurants(response.data);
            setShowAddModal(false);
            setNewRestaurant({
                name: "",
                imageUrl: "",
                districtId: districts[1].id,
                locationUrl: "",
                menu: [{ food: "", price: 0 }],
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(p => p + 1);
    };

    // Show spinner while loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
            </div>
        );
    }

    // Filter restaurants based on selected district and search query
    const filteredRestaurants = Array.isArray(restaurants)
        ? restaurants.filter(restaurant => {
            const matchesDistrict = selectedDistrict === "all" || restaurant.districtId === selectedDistrict;
            const matchesSearch = searchQuery === "" || 
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDistrict && matchesSearch;
        })
        : [];

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
        <Link to={`/restaurants/${restaurant._id}`} className="group block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
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
        <>
        {showAddModal && (
            <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 relative">
                    <button type="button" onClick={() => setShowAddModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Thêm quán ăn</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên quán ăn</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={newRestaurant.imageUrl} onChange={(e) => setNewRestaurant({ ...newRestaurant, imageUrl: e.target.value })}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2" value={newRestaurant.districtId} onChange={(e) => setNewRestaurant({ ...newRestaurant, districtId: e.target.value })}>
                                {districts.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Địa chỉ</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={newRestaurant.locationUrl} onChange={(e) => setNewRestaurant({ ...newRestaurant, locationUrl: e.target.value })}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thực đơn</label>
                            {newRestaurant.menu.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" placeholder="Food ID" className="flex-1 border border-gray-300 rounded px-3 py-2" value={item.food} onChange={(e) => {
                                        const menuCopy = [...newRestaurant.menu];
                                        menuCopy[index].food = e.target.value;
                                        setNewRestaurant({ ...newRestaurant, menu: menuCopy });
                                    }}/>
                                    <input type="number" placeholder="Price" className="w-24 border border-gray-300 rounded px-3 py-2" value={item.price} onChange={(e) => {
                                        const menuCopy = [...newRestaurant.menu];
                                        menuCopy[index].price = Number(e.target.value);
                                        setNewRestaurant({ ...newRestaurant, menu: menuCopy });
                                    }}/>
                                </div>
                            ))}
                            <button type="button" onClick={() => setNewRestaurant({ ...newRestaurant, menu: [ ...newRestaurant.menu, { food: "", price: 0 } ] })} className="cursor-pointer text-sm text-blue-600 hover:underline">Thêm món</button>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={() => setShowAddModal(false)} className="cursor-pointer px-4 py-2 bg-gray-200 rounded mr-2">Hủy</button>
                        <button type="button" onClick={handleAddRestaurant} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded">Tạo</button>
                    </div>
                </div>
            </div>
        )}
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Hero Section with search */}
            <div className="mt-16 relative bg-gradient-to-r from-red-700 to-red-500 text-white">
                <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Khám phá quán ăn tại TP.HCM</h1>
                        <p className="text-red-100 mb-8">Tìm kiếm các quán ăn ngon nhất với các món ăn đặc sắc tại Thành phố Hồ Chí Minh</p>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm quán ăn..." 
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
                                    ? "Tất cả quán ăn" 
                                    : `Quán ăn tại ${districts.find(d => d.id === selectedDistrict)?.name}`}
                            </h2>
                            <span className="flex items-center gap-2">
                                {isAdmin && (
                                    <IoMdAddCircle
                                        className="text-red-600 text-2xl cursor-pointer"
                                        onClick={() => setShowAddModal(true)}
                                    />
                                )}
                                <span className="text-gray-500 text-sm">{sortedRestaurants.length} quán ăn</span>
                            </span>
                        </div>
                        
                        {sortedRestaurants.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedRestaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy quán ăn</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Không tìm thấy quán ăn phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với bộ lọc khác.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={handlePreviousPage} 
                                    disabled={currentPage === 1}
                                    className="cursor-pointer hover:bg-red-100 hover:text-red-600"
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem className="cursor-pointer" key={page}>
                                    <PaginationLink 
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                        className={currentPage === page ? "bg-red-600 text-white hover:bg-red-700" : "hover:bg-red-100 hover:text-red-600"}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={handleNextPage} 
                                    disabled={currentPage === totalPages}
                                    className="cursor-pointer hover:bg-red-100 hover:text-red-600"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
        </>
    );
};

export default RestaurantListPage;