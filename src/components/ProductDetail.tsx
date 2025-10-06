import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Products } from "../data/product";
import { productCardConfig } from "../config/productCardConfig";
import { useCart } from "../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productId = Number(id);

  const product = Products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"mota" | "bosung" | "danhgia">(
    "mota"
  );

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-700 font-semibold max-w-screen-xl mx-auto bg-[#fdfbf5]">
        Sản phẩm không tồn tại.
      </div>
    );
  }

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 bg-[#fdfbf5] text-[#4a4a4a]">
      {/* LEFT: Chi tiết sản phẩm */}
      <div className="md:pr-6 md:border-r md:border-gray-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Ảnh sản phẩm */}
          <div className="relative md:w-[60%]">
            <img
              src={product.img}
              alt={product.name}
              className="rounded-xl w-full h-[340px] object-cover"
            />
            {product.soldOut && (
              <div
                className={`absolute inset-0 flex items-center justify-center text-xl font-bold
                ${productCardConfig.soldOutOverlay.bgColor} ${productCardConfig.soldOutOverlay.textColor}`}
              >
                {productCardConfig.soldOutLabel}
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-pink-800">{product.name}</h1>
            <p className="text-xl text-[#222] font-semibold">
              <span>Giá: </span>
              {parseInt(product.price.toString()).toLocaleString()}đ
            </p>

            {/* Số lượng */}
            <div>
              <label className="font-medium">Số lượng:</label>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={decreaseQuantity}
                  className="border px-3 py-1 rounded bg-white hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="border px-3 py-1 rounded bg-white hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút thêm giỏ hàng */}
            <button
              onClick={handleAddToCart}
              className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow cursor-pointer"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Tabs mô tả / bổ sung / đánh giá */}
        <div className="col-span-full mt-12 px-8">
          <div className="border-b border-gray-300 mb-4">
            <ul className="flex space-x-6 text-sm font-semibold text-gray-600">
              {[
                { key: "mota", label: "MÔ TẢ" },
                { key: "bosung", label: "THÔNG TIN BỔ SUNG" },
                { key: "danhgia", label: "ĐÁNH GIÁ (0)" },
              ].map(({ key, label }) => (
                <li
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`cursor-pointer pb-2 ${
                    activeTab === key
                      ? "border-b-2 border-pink-600 text-pink-700"
                      : ""
                  }`}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
