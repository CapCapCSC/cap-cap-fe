import { useState, useEffect } from "react";
// import axios from "axios";
import Navbar from "@/components/custom/Navbar";
import FoodCard from "@/components/custom/FoodCard";
import { Link } from "react-router-dom";

// Dữ liệu mẫu (sử dụng tạm thời cho frontend)
const foods = [
  {
    _id: "1",
    name: "Cơm hải sản",
    description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.",
    imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png",
    price: 75000,
  },
  {
    _id: "2",
    name: "Lẩu Thái chua cay",
    description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.",
    imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg",
    price: 120000,
  },
  {
    _id: "3",
    name: "Gỏi xoài tôm khô",
    description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.",
    imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg",
    price: 45000,
  },
  {
    _id: "4",
    name: "Phở bò",
    description: "Phở bò truyền thống với nước dùng đậm đà và thịt bò tươi ngon.",
    imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/pho-bo-1200x676.jpg",
    price: 50000,
  },
  {
    _id: "5",
    name: "Bánh mì thịt nướng",
    description: "Bánh mì giòn rụm kết hợp thịt nướng thơm ngon và rau sống.",
    imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/banh-mi-thit-nuong-1200x676.jpg",
    price: 30000,
  },
  {
    _id: "6",
    name: "Bún bò Huế",
    description: "Bún bò Huế với nước dùng cay nồng và thịt bò mềm.",
    imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/bun-bo-hue-1200x676.jpg",
    price: 60000,
  },
  {
    _id: "7",
    name: "Chả giò",
    description: "Chả giò giòn rụm với nhân thịt và rau củ.",
    imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/cha-gio-1200x676.jpg",
    price: 40000,
  },
];

const FoodListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Khi backend sẵn sàng, có thể chuyển sang dùng API:
  // const [foods, setFoods] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("/api/foods", {
  //       params: {
  //         page: currentPage,
  //         limit: itemsPerPage,
  //         // tags: "tag1,tag2",
  //       },
  //     })
  //     .then((response) => {
  //       setFoods(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, [currentPage]);

  const totalPages = Math.ceil(foods.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-32 px-8 py-6">
        <h1 className="text-5xl text-center font-lobster mb-8 text-red-600">
          Danh sách món ăn
        </h1>

        {/* Danh sách món ăn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFoods.map(food => (
            <Link key={food._id} to={`/foods/${food._id}`}>
              <FoodCard
                name={food.name}
                description={food.description}
                imgUrl={food.imgUrl}
                price={food.price}
              />
            </Link>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Trang trước
          </button>
          <span className="text-xl font-semibold">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodListPage;
