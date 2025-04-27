import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Tag, Clock } from "lucide-react";
import { getFoodById, editFood, deleteFood } from "@/services/foodService";
import { MdModeEditOutline } from "react-icons/md";
import { useAdmin } from "../context/AdminContext";
import { TiDelete } from "react-icons/ti";

const FoodDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { isAdmin } = useAdmin();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editImgUrl, setEditImgUrl] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editError, setEditError] = useState(null);

  const handleOpenEditModal = () => {
    setEditName(food.name);
    setEditDescription(food.description);
    setEditIngredients((food.ingredients || []).join(", "));
    setEditImgUrl(food.imgUrl);
    setEditTags((food.tags || []).map(t => t._id).join(", "));
    setEditError(null);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const foodData = {
      name: editName,
      description: editDescription,
      ingredients: editIngredients.split(",").map(s => s.trim()).filter(Boolean),
      imgUrl: editImgUrl,
      tags: editTags.split(",").map(s => s.trim()).filter(Boolean),
    };
    try {
      setLoading(true);
      await editFood(id, foodData);
      const updated = await getFoodById(id);
      setFood(updated);
      setShowEditModal(false);
      setLoading(false);
    } catch (err) {
      setEditError(err.message || "Failed to update food");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFood(id);
      navigate(-1);
      navigate("/foods");
    } catch (err) {
      setError(err.message || "Failed to delete food");
    }
  };

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
      <div className="bg-white sticky top-16 z-30 border-b">
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
          {isAdmin && (
            <div className="flex justify-end mb-4">
              <button onClick={handleOpenEditModal} className="cursor-pointer text-red-600 hover:text-red-700">
                <MdModeEditOutline className="h-6 w-6" />
              </button>
              <button onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
                  handleDelete();
                }
              }} className="cursor-pointer text-red-600 hover:text-red-700">
                <TiDelete className="h-6 w-6" />
              </button>
            </div>
          )}
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
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4">Edit Food</h2>
            {editError && <p className="text-red-500 mb-2">{editError}</p>}
            <form onSubmit={handleEditSubmit}>
              <div className="mb-2">
                <label className="block mb-1">Name</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Description</label>
                <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Ingredients (comma separated)</label>
                <input type="text" value={editIngredients} onChange={e => setEditIngredients(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Image URL</label>
                <input type="text" value={editImgUrl} onChange={e => setEditImgUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Tags (comma separated tag IDs)</label>
                <input type="text" value={editTags} onChange={e => setEditTags(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailPage;
