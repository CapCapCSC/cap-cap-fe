import { useNavigate } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";

const RestaurantCard = ({ imageUrl, name, locationUrl, menu, restaurantId }) => {
    const navigate = useNavigate();
    
    const handleFoodClick = (foodId, event) => {
        event.stopPropagation(); // Prevent triggering parent onClick
        navigate(`/foods/${foodId}`);
    };
    
    const handleRestaurantClick = () => {
        navigate(`/restaurants/${restaurantId}`);
    };
    
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div 
                className="cursor-pointer" 
                onClick={handleRestaurantClick}
            >
                {/* Restaurant image and info */}
                <div className="relative">
                    <img
                        className="object-cover w-full h-40 sm:h-48"
                        src={imageUrl}
                        alt={name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h3 className="text-lg font-bold">{name}</h3>
                        <a
                            href={locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center text-white/80 hover:text-white mt-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Xem trên bản đồ</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                    </div>
                </div>

                {/* Menu items */}
                <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5"></span>
                        Món ăn nổi bật
                    </h4>
                    <ul className="space-y-2">
                        {menu.slice(0, 2).map((item) => (
                            <li 
                                key={item.food._id} 
                                className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                                onClick={(e) => handleFoodClick(item.food._id, e)}
                            >
                                <img
                                    src={item.food.imgUrl}
                                    alt={item.food.name}
                                    className="w-14 h-14 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-medium text-gray-800 truncate">{item.food.name}</h5>
                                    <p className="text-xs text-gray-500 line-clamp-1">{item.food.description}</p>
                                    <p className="text-xs font-semibold text-red-600 mt-0.5">
                                        {item.price.toLocaleString('vi-VN')}₫
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
