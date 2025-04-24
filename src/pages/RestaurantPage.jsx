import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Search } from "lucide-react";

// demo du lieu
const restaurants = [
    {
        id: 1,
        name: "Quán A",
        imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
        district: "Quận 1",
        locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
        menu: [
            {
                food: {
                    _id: "1",
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000,
                category: "Cơm"
            },
            {
                food: {
                    _id: "2",
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000,
                category: "Lẩu"
            },
            {
                food: {
                    _id: "3",
                    name: "Gỏi xoài tôm khô",
                    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
                },
                price: 45000,
                category: "Khai vị"
            },
            {
                food: {
                    _id: "4",
                    name: "Cơm chiên dương châu",
                    description: "Cơm chiên với thịt xá xíu, đậu Hà Lan, và trứng.",
                    imgUrl: "https://cdn.tgdd.vn/Files/2021/08/09/1373996/cach-lam-com-chien-duong-chau-thom-ngon-hap-dan-tai-nha-202201041044461946.jpg"
                },
                price: 65000,
                category: "Cơm"
            },
            {
                food: {
                    _id: "5",
                    name: "Bún bò Huế",
                    description: "Bún bò Huế truyền thống với nước dùng cay nồng đặc trưng.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2023/02/27/Thanh-pham-1-8438-1677489900.jpg"
                },
                price: 85000,
                category: "Bún"
            },
            {
                food: {
                    _id: "6",
                    name: "Chè thái",
                    description: "Chè thái với thạch trái cây và sữa đặc.",
                    imgUrl: "https://cdn.tgdd.vn/Files/2021/09/06/1380866/cach-nau-che-thai-sua-dac-thom-ngon-be-nao-cung-me-202201041333035215.jpg"
                },
                price: 35000,
                category: "Tráng miệng"
            },
        ]
    },
    // ... other restaurants
];

const RestaurantPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
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
        // In a real app, this would be a fetch call
        const restaurantData = restaurants[id - 1] || null;
        setRestaurant(restaurantData);
    }, [id]);

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p>Đang tải thông tin nhà hàng...</p>
                </div>
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
                    <Link to="/restaurants" className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
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
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
                                            to={`/foods/${item.food._id}`} 
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
                                                    <button className="text-sm font-medium text-red-600 hover:text-red-700">
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