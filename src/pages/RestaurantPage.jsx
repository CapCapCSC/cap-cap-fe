import FoodCard from "@/components/custom/FoodCard";
import Navbar from "@/components/custom/Navbar";
import SearchBar from "@/components/custom/SearchBar";
import { Link } from "react-router-dom";

import { IoLocationSharp } from "react-icons/io5";

// demo data
const restaurant = {
    imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
    name: "Quán A",
    locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
    districtId: "quan-9",
    menu: [
        {
            id: "1",
            food: {
                name: "Cơm hải sản",
                description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
            },
            price: 75000
        },
        {
            id: "2",
            food: {
                name: "Lẩu Thái chua cay",
                description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
            },
            price: 120000
        },
        {
            id: "3",
            food: {
                name: "Gỏi xoài tôm khô",
                description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
            },
            price: 45000
        },
        {
            id: "4",
            food: {
                name: "Cơm hải sản",
                description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
            },
            price: 75000
        },
        {
            id: "5",
            food: {
                name: "Lẩu Thái chua cay",
                description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
            },
            price: 120000
        },
        {
            id: "6",
            food: {
                name: "Gỏi xoài tôm khô",
                description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
            },
            price: 45000
        },
        {
            id: "7",
            food: {
                name: "Cơm hải sản",
                description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
            },
            price: 75000
        },
        {
            id: "8",
            food: {
                name: "Lẩu Thái chua cay",
                description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
            },
            price: 120000
        },
        {
            id: "9",
            food: {
                name: "Gỏi xoài tôm khô",
                description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
            },
            price: 45000
        },
    ]
}

const RestaurantPage = () => {

    const menu = restaurant.menu;

    return(
        <div>
            <Navbar />
            <div>
                <div className="relative">
                        {/* Ảnh nền */}
                        <img
                            src={restaurant.imageUrl}
                            alt="background"
                            className="w-full lg:h-96 sm:h-64 object-cover"
                        />
                        {/* Tên quán */}
                        <div className="mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-red-600 text-3xl font-bold px-6 py-2 rounded-xl shadow-md">
                            {restaurant.name}
                        </div>
                    </div>

                    {/* Thông tin địa chỉ + Menu + Tìm kiếm */}
                    <div className="px-8 py-6">
                    <div className="flex">
                        <IoLocationSharp className="text-red-700"/>
                        <a
                            href={restaurant.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 pl-1"
                            >
                            Xem địa điểm trên bản đồ
                        </a>
                    </div>
                    {/* Menu + search */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-red-600 text-2xl font-semibold">Menu</p>
                        <SearchBar />
                    </div>


                    {/* Danh sách món ăn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {
                            menu.map((item, index) => (
                                <Link key={index} to={`/foods/${item.id}`}>
                                    <FoodCard 
                                        name={item.food.name}
                                        description={item.food.description}
                                        imgUrl={item.food.imgUrl}
                                        price={item.price}
                                    />
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantPage;