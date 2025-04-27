import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Search, X } from "lucide-react";
import { getRestaurantById, editRestaurant, deleteRestaurant } from "@/services/restaurantService";
import { MdModeEditOutline } from "react-icons/md";
import { useAdmin } from "../context/AdminContext";
import { TiDelete } from "react-icons/ti";

const RestaurantPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({ name: "", imageUrl: "", district: "", locationUrl: "", menu: [] });
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { isAdmin } = useAdmin();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    // Initialize editData when restaurant is loaded
    useEffect(() => {
        if (restaurant) {
            setEditData({
                name: restaurant.name,
                imageUrl: restaurant.imageUrl,
                district: restaurant.district,
                locationUrl: restaurant.locationUrl,
                menu: restaurant.menu.map(item => ({ food: item.food, price: item.price }))
            });
        }
    }, [restaurant]);

    const handleEditRestaurant = async () => {
        try {
            const payload = {
                name: editData.name,
                imageUrl: editData.imageUrl,
                districtId: editData.district,
                locationUrl: editData.locationUrl,
                menu: editData.menu.map(item => ({ food: item.food._id, price: item.price })),
            };
            await editRestaurant(restaurant._id, payload);
            const updated = await getRestaurantById(id);
            setRestaurant(updated);
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteRestaurant = async () => {
        try {
            await deleteRestaurant(restaurant._id);
            navigate("/restaurants");
        } catch (error) {
            console.error(error);
        }
    };

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
        <>
        {showEditModal && (
            <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 relative">
                    <button type="button" onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Chỉnh sửa quán ăn</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên quán ắn</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ảnh URL</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={editData.imageUrl} onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={editData.district} onChange={(e) => setEditData({ ...editData, district: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location URL</label>
                            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={editData.locationUrl} onChange={(e) => setEditData({ ...editData, locationUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Menu</label>
                            {editData.menu.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-center mb-2">
                                    <span className="flex-1">{item.food.name}</span>
                                    <input type="number" className="w-24 border border-gray-300 rounded px-3 py-2" value={item.price} onChange={(e) => {
                                        const menuCopy = [...editData.menu];
                                        menuCopy[idx].price = Number(e.target.value);
                                        setEditData({ ...editData, menu: menuCopy });
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={() => setShowEditModal(false)} className="cursor-pointer px-4 py-2 bg-gray-200 rounded mr-2">Hủy</button>
                        <button type="button" onClick={handleEditRestaurant} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded">Lưu</button>
                    </div>
                </div>
            </div>
        )}
        {showDeleteModal && (
            <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
                    <button type="button" onClick={() => setShowDeleteModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Xác nhận xóa quán ăn</h2>
                    <p className="mb-6">Bạn có chắc chắn muốn xóa quán ăn này? Hành động này không thể hoàn tác.</p>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowDeleteModal(false)} className="cursor-pointer px-4 py-2 bg-gray-200 rounded">Hủy</button>
                        <button type="button" onClick={handleDeleteRestaurant} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded">Xóa</button>
                    </div>
                </div>
            </div>
        )}
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Back navigation */}
            <div className="bg-white sticky top-16 z-20 border-b">
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
                        <div className="flex items-center justify-between gap-2">
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
                            {isAdmin && (
                                <div className="flex items-center gap-2">
                                    <MdModeEditOutline className="text-red-600 text-2xl cursor-pointer" onClick={() => setShowEditModal(true)} />
                                    <TiDelete className="text-red-600 text-2xl cursor-pointer" onClick={() => setShowDeleteModal(true)} />
                                </div>
                            )}
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
        </>
    );
};

export default RestaurantPage;