import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ imageUrl, name, locationUrl, menu }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto my-4">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row ">
                <div
                    href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl hover:bg-gray-50 cursor-pointer" onClick={() => navigate("/restaurants/1")}
                    >
                    <img
                        className="object-cover w-full rounded-t-lg h-96"
                        src={imageUrl}
                        alt={name}
                    />
                    <div className="flex flex-col justify-start p-4 w-full text-left">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                        <a
                        href={locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline mb-4"
                        >
                        Xem địa điểm trên bản đồ
                        </a>
                    </div>
                </div>

                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div>
                        <h6 className="text-lg font-semibold mb-2 text-gray-800">Món ăn nổi bật</h6>
                        <ul className="space-y-4">
                            {menu.slice(0, 3).map((item, index) => (
                                <li key={index} className="flex items-start space-x-4 hover:bg-red-200 cursor-pointer">
                                    <img
                                        src={item.food.imgUrl}
                                        alt={item.food.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h6 className="text-md font-medium text-gray-900 ">{item.food.name}</h6>
                                        <p className="text-sm text-gray-600 ">{item.food.description}</p>
                                        <p className="text-sm font-semibold text-red-600 mt-1">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
