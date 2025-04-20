import Navbar from "@/components/custom/Navbar";
import RestaurantCard from "../components/custom/RestaurantCard";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// demo du lieu
const restaurants = [
    {
        imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
        name: "Quán A",
        locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
        districtId: "quan-9",
        menu: [
            {
                food: {
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000
            },
            {
                food: {
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000
            },
            {
                food: {
                    name: "Gỏi xoài tôm khô",
                    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
                },
                price: 45000
            },
        ]
    },
    {
        imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
        name: "Quán A",
        locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
        districtId: "quan-9",
        menu: [
            {
                food: {
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000
            },
            {
                food: {
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000
            },
            {
                food: {
                    name: "Gỏi xoài tôm khô",
                    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
                },
                price: 45000
            },
        ]
    },
    {
        imageUrl: "https://noithattruongsa.com/wp-content/uploads/2020/11/mau-thiet-ke-quan-an-sang-binh-dan-dep-15-Hang-Noi-That-Truong-Sa.jpg",
        name: "Quán A",
        locationUrl: "https://maps.google.com/?q=10.762622,106.660172",
        districtId: "quan-9",
        menu: [
            {
                food: {
                    name: "Cơm hải sản",
                    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
                    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png"
                },
                price: 75000
            },
            {
                food: {
                    name: "Lẩu Thái chua cay",
                    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
                    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg"
                },
                price: 120000
            },
            {
                food: {
                    name: "Gỏi xoài tôm khô",
                    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
                    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg"
                },
                price: 45000
            },
        ]
    },
];

const RestaurantListPage = () => {
    return(
        <div>
            <Navbar />
            <div className="mt-32">
                <h1 className="z-50 text-6xl text-center font-lobster bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 transition-all duration-500">
                    Danh sách cửa hàng
                </h1>
                <div className="z-10 mt-20 flex flex-col justify-center mx-6 px-10">
                    <Carousel>
                        <CarouselContent>
                            
                                {restaurants.map((restaurant, index) => (
                                    <CarouselItem className="lg:basis-1/2">
                                        <div key={restaurant.id || index}>
                                            <div href={restaurant.locationUrl}>
                                                <RestaurantCard
                                                    name={restaurant.name}
                                                    imageUrl={restaurant.imageUrl}
                                                    menu={restaurant.menu}
                                                />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default RestaurantListPage;