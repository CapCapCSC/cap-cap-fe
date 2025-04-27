import { useState, useEffect } from "react";
// import axios from "axios";
import FoodCard from "@/components/custom/FoodCard";
import { Link } from "react-router-dom";
import { getFoods, createFood } from '@/services/foodService';
import { IoMdAddCircle } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useAdmin } from '../context/AdminContext.jsx';


// We'll fetch foods from backend
// const foods = [];

const FoodListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const { isAdmin } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newTags, setNewTags] = useState('');
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getFoods(currentPage, itemsPerPage)
      .then((response) => {
        setFoods(response.data);
        const { total, limit } = response.pagination;
        setTotalPages(Math.ceil(total / limit));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage]);

  // currentFoods comes directly from API pagination
  const currentFoods = foods;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const foodData = {
      name: newName,
      description: newDescription,
      ingredients: newIngredients.split(',').map(s => s.trim()).filter(Boolean),
      imgUrl: newImgUrl,
      tags: newTags.split(',').map(s => s.trim()).filter(Boolean),
    };
    try {
      setLoading(true);
      await createFood(foodData);
      setShowAddModal(false);
      setNewName(''); setNewDescription(''); setNewIngredients(''); setNewImgUrl(''); setNewTags('');
      const response = await getFoods(currentPage, itemsPerPage);
      setFoods(response.data);
      const { total, limit } = response.pagination;
      setTotalPages(Math.ceil(total / limit));
      setLoading(false);
    } catch (err) {
      setModalError(err.message || 'Failed to create food');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">

          <div className="flex items-center justify-between border-b px-6 py-4 sticky">
            <h1 className="text-4xl font-lobster text-red-600">Danh sách món ăn</h1>
            {isAdmin && (
              <IoMdAddCircle
                className="text-red-600 text-2xl cursor-pointer"
                onClick={() => setShowAddModal(true)}
              />
            )}
          </div>
          <div className="p-6">
            {loading && <p>Đang tải danh sách món ăn...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentFoods.map((food) => (
                  <Link key={food._id} to={`/foods/${food._id}`}>  
                    <FoodCard
                      name={food.name}
                      description={food.description}
                      imgUrl={food.imgUrl}
                      tags={food.tags}
                      price={food.price}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Pagination className="mt-4 mb-6">
            <PaginationContent>
              {/* Trang trước */}
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousPage} disabled={currentPage === 1}
                  className="cursor-pointer hover:bg-red-100 hover:text-red-600"
                />

              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem className="cursor-pointer" key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className={currentPage === page ? "bg-red-600 text-white hover:bg-red-700" : "hover:bg-red-100 hover:text-red-600"}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Trang sau */}
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} disabled={currentPage === totalPages}
                  className="cursor-pointer hover:bg-red-100 hover:text-red-600"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4">Thêm món mới</h2>
            {modalError && <p className="text-red-500 mb-2">{modalError}</p>}
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-2">
                <label className="block mb-1">Tên món ăn</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Mô tả</label>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Nguyên liệu (cách nhau bởi dấu phẩy)</label>
                <input type="text" value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Link ảnh</label>
                <input type="text" value={newImgUrl} onChange={(e) => setNewImgUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Tags (cách nhau bởi dấu phẩy)</label>
                <input type="text" value={newTags} onChange={(e) => setNewTags(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded border">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodListPage;
