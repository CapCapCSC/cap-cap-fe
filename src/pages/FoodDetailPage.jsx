import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Tag, Clock } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Đang tải thông tin món ăn...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy món ăn</h2>
          <p className="text-gray-600 mb-6">Món ăn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Back navigation */}
      <div className="bg-white sticky top-0 z-50 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>
      
      {/* Hero section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={food.imgUrl} 
          alt={food.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold mb-3 drop-shadow-lg">{food.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {food.tags && food.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {food.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-black/30 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Food info */}
      <div className="container mx-auto max-w-6xl px-4 mt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết món ăn</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{food.description}</p>
            
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <Clock className="h-5 w-5 mr-2 text-red-500" />
              Nguyên liệu
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ingredient, index) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
                Đặt món này
              </button>
            </div>
          </div>
        </div>
        
        {/* Related foods - could be added here */}
      </div>
    </div>
  );
};

export default FoodDetailPage;
