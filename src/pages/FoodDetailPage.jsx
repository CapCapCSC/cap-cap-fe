import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";

// Dữ liệu mẫu (giống trong FoodListPage)
const sampleFoods = [
  { _id: "1", name: "Cơm hải sản", description: "Cơm chiên cùng tôm, mực và rau củ tươi ngon.", ingredients: ["Tôm", "Mực", "Rau củ", "Cơm"], imgUrl: "https://danviet.ex-cdn.com/files/f1/2020/8/31/image4-1598431030-68-width605height416-1598810316509-15988103165132025318295.png", tags: ["Hải sản", "Cơm"] },
  { _id: "2", name: "Lẩu Thái chua cay", description: "Nước lẩu đậm đà kết hợp tôm, mực và rau tươi.", ingredients: ["Tôm", "Mực", "Rau tươi", "Nước lẩu"], imgUrl: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg", tags: ["Lẩu", "Chua cay"] },
  { _id: "3", name: "Gỏi xoài tôm khô", description: "Gỏi xoài xanh kết hợp tôm khô, đậu phộng và rau thơm.", ingredients: ["Xoài", "Tôm khô", "Đậu phộng", "Rau thơm"], imgUrl: "https://cdn.tgdd.vn/2020/06/CookProduct/1-1200x675-3.jpg", tags: ["Gỏi", "Trái cây"] },
  { _id: "4", name: "Phở bò", description: "Phở bò truyền thống với nước dùng đậm đà và thịt bò tươi ngon.", ingredients: ["Bún phở", "Bò", "Nước dùng"], imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/pho-bo-1200x676.jpg", tags: ["Phở", "Bò"] },
  { _id: "5", name: "Bánh mì thịt nướng", description: "Bánh mì giòn rụm kết hợp thịt nướng thơm ngon và rau sống.", ingredients: ["Bánh mì", "Thịt nướng", "Rau sống"], imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/banh-mi-thit-nuong-1200x676.jpg", tags: ["Bánh mì", "Thịt nướng"] },
  { _id: "6", name: "Bún bò Huế", description: "Bún bò Huế với nước dùng cay nồng và thịt bò mềm.", ingredients: ["Bún", "Bò Huế", "Nước dùng"], imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/bun-bo-hue-1200x676.jpg", tags: ["Bún", "Huế"] },
  { _id: "7", name: "Chả giò", description: "Chả giò giòn rụm với nhân thịt và rau củ.", ingredients: ["Rau củ", "Thịt", "Bột gạo"], imgUrl: "https://cdn.tgdd.vn/2021/06/CookProduct/cha-gio-1200x676.jpg", tags: ["Chả giò"] },
];

const FoodDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // Khi backend hoàn thành, bỏ comment và sử dụng axios:
    // setLoading(true);
    // axios.get(`/api/foods/${id}`)
    //   .then(response => {
    //     setFood(response.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err.message);
    //     setLoading(false);
    //   });

    // Dùng dữ liệu mẫu tạm:
    const found = sampleFoods.find(item => item._id === id);
    setFood(found || null);
  }, [id]);

  // if (loading) return <p>Đang tải dữ liệu...</p>;
  // if (error) return <p>Lỗi: {error}</p>;

  if (!food) {
    return <p className="text-center mt-20">Không tìm thấy món ăn.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-24 px-4">
        <h1 className="text-3xl font-bold text-center">{food.name}</h1>
        <div className="flex flex-col md:flex-row items-center mt-8 gap-8">
          <img
            src={food.imgUrl}
            alt={food.name}
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />
          <div className="md:ml-8">
            <p className="text-gray-600">{food.description}</p>

            <h3 className="text-lg font-bold mt-4">Nguyên liệu:</h3>
            <ul className="list-disc list-inside mt-1">
              {food.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mt-4">Tags:</h3>
            <ul className="list-disc list-inside mt-1">
              {food.tags.map((tag, idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
