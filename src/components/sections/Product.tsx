import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { Products } from "../../data/product";
import Pagination from "../Pagination";
import FilterSidebar from "../FilterSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../../context/ProductContext";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState(Products);
  const [currentPage, setCurrentPage] = useState(1);
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
    <section className="relative min-h-screen w-full overflow-hidden px-8 mt-4">
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
            <div className="flex gap-2 lg:gap-8">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="relative">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-xl"
                    />
                    {cart.length > 0 && (
                      <span className="absolute top-0 right-[-8px] bg-pink-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </Popover.Trigger>
                <Popover.Content
                  align="end"
                  sideOffset={8}
                  className="bg-white rounded-lg shadow-xl border w-80 p-5 z-50"
                >
                  {cart.length > 0 ? (
                    <>
                      <div className="max-h-80 overflow-y-auto space-y-4">
                        {cart.map((item) => (
                          <div key={item.product.id}>
                            <div className="flex items-start gap-4 border-b pb-4">
                              <Link to={`cart/${item.product.id}`}>
                                <img
                                  src={item.product.img}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex-1 space-y-1">
                                <Link to={`cart/${item.product.id}`}>
                                  <h4 className="font-semibold text-gray-700 hover:text-gray-900">
                                    {item.product.name}
                                  </h4>
                                  <p className="text-gray-500">
                                    {item.quantity} ×{" "}
                                    {item.product.price.toLocaleString()}₫
                                  </p>
                                </Link>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between border-t pt-4 font-semibold">
                        <span>Tổng cộng:</span>
                        <span className="text-black">
                          {total.toLocaleString()}₫
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <Link to="cart">
                          <button className="w-full bg-pink-600 text-white py-2 font-semibold hover:bg-pink-700 rounded">
                            XEM GIỎ HÀNG
                          </button>
                        </Link>
                        <Link to="checkOut">
                          <button className="w-full bg-pink-600 text-white py-2 font-semibold hover:bg-pink-700 rounded">
                            THANH TOÁN
                          </button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500">
                      Giỏ hàng đang trống
                    </p>
                  )}
                </Popover.Content>
              </Popover.Root>
              <button className="relative hover:text-gray-800 cursor-pointer">
                <FontAwesomeIcon icon={faHeart} size="xl" />
                <span className="absolute top-0 right-[-8px] bg-pink-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  5
                </span>
              </button>
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
