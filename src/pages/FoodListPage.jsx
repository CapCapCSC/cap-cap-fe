import { useState, useEffect } from "react";
// import axios from "axios";
import FoodCard from "@/components/custom/FoodCard";
import { Link } from "react-router-dom";
import { getFoods } from '@/services/foodService';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


// We'll fetch foods from backend
// const foods = [];

const FoodListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

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

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">

          <div className="border-b px-6 py-4 sticky">
            <h1 className="text-4xl font-lobster text-red-600">Danh sách món ăn</h1>
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
    </div>
  );
};

export default FoodListPage;
