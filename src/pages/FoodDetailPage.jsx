import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Tag, Clock } from "lucide-react";
import { getFoodById } from "@/services/foodService";

const FoodDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    getFoodById(id)
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Lỗi: {error}</p>
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
      <div className="bg-white sticky top-16 z-50 border-b">
        <div className="cursor-pointer container mx-auto max-w-6xl px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>
      
      {/* New side-by-side layout */}
      <div className="container mx-auto max-w-6xl px-4 mt-40 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={food.imgUrl} alt={food.name} className="w-full h-auto rounded-xl shadow-md" />
          {food.tags && food.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {food.tags.map((tagObj, index) => (
                <span
                  key={index}
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: tagObj.color, color: 'white' }}
                >
                  {tagObj.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-red-500 mb-4">{food.name}</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">{food.description}</p>
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
            <Clock className="h-5 w-5 mr-2 text-red-500" />
            Nguyên liệu
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {food.ingredients.map((ingredient, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related foods - could be added here */}
    </div>
  );
};

export default FoodDetailPage;
