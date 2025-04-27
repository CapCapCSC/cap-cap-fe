import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Search } from "lucide-react";
import { getRestaurantById } from "@/services/restaurantService";

const RestaurantPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Get the unique categories
    const getCategories = (menu) => {
        const categories = new Set(menu.map(item => item.category));
        return ["all", ...Array.from(categories)];
    };

    // Filter menu items based on search and category
    const getFilteredMenu = () => {
        if (!restaurant) return [];
        
        return restaurant.menu.filter(item => {
            const matchesSearch = searchText === "" || 
                item.food.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.food.description.toLowerCase().includes(searchText.toLowerCase());
                
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    };

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoading(true);
            try {
                const restaurantData = await getRestaurantById(id);
                setRestaurant(restaurantData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Restaurant not found</p>
            </div>
        );
    }



    const filteredMenu = getFilteredMenu();
    const categories = getCategories(restaurant.menu);

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Back navigation */}
            <div className="bg-white sticky top-16 z-50 border-b">
                <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center">
                    <Link to="/restaurants" className=" cursor-pointer flex items-center text-gray-700 hover:text-red-600 transition-colors">
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        <span>Quay lại danh sách</span>
                    </Link>
                </div>
            </div>
            
            {/* Hero section */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                    src={restaurant.coverImage || restaurant.imageUrl} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pb-20 text-white z-10">
                    <div className="container mx-auto max-w-6xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">{restaurant.name}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
                                <span className="text-gray-200">{restaurant.district}</span>
                            </div>
                            {restaurant.categories && (
                                <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
                                    <span className="text-gray-200">{restaurant.categories.join(", ")}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Restaurant info */}
            <div className="container mx-auto max-w-6xl px-4 -mt-16 relative z-20 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                                <a
                                    href={restaurant.locationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Xem trên bản đồ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Menu section */}
            <div className="container mx-auto max-w-6xl px-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-2xl font-bold text-gray-800">Thực đơn</h2>
                    </div>

                    {/* Search and filter */}
                    <div className="px-6 py-4 border-b">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm món ăn..." 
                                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                            
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            selectedCategory === category
                                                ? "bg-red-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category === "all" ? "Tất cả" : category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Menu items */}
                    <div className="p-6">
                        {filteredMenu.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredMenu.map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Link 
                                            to={`/foods/${item.food}`} 
                                            className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg group"
                                        >
                                            <img 
                                                src={item.food.imgUrl} 
                                                alt={item.food.name}
                                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link to={`/foods/${item.food._id}`} className="hover:text-red-600 transition-colors">
                                                <h3 className="font-semibold text-lg mb-1">{item.food.name}</h3>
                                            </Link>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.food.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-red-600 font-semibold">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </span>
                                                <div className="flex gap-2">
                                                    <Link 
                                                        to={`/foods/${item.food._id}`}
                                                        className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                                                    >
                                                        Chi tiết
                                                    </Link>
                                                    <span className="text-gray-300">|</span>
                                                    <button className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700">
                                                        Đặt ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy món ăn</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Không tìm thấy món ăn phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantPage;