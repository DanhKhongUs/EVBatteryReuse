import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Products } from "../data/product";
import Pagination from "../components/Pagination";
import FilterSidebar from "../components/FilterSidebar";

export default function ProductPage() {
  const [products, setProducts] = useState(Products);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const allProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleToggleLike = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-8 mt-12">
      <div className="flex gap-6">
        <div className="hidden lg:flex">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2 border-b pb-4">
            <div className="flex gap-4 items-center">
              <h2 className="text-base lg:text-2xl text-gray-700 font-bold">
                Có hơn {products.length} sản phẩm
              </h2>

              <div className="lg:hidden flex border text-sm border-gray-700">
                <select name="Chose" className="p-1">
                  <option value="allProduct">Tất cả sản phẩm</option>
                  <option value="saab">Xe</option>
                  <option value="fiat">Pin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
            {allProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
