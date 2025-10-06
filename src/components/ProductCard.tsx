import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product } from "../types";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
interface Props {
  product: Product;
  onToggleLike: (id: number) => void;
}

export default function ProductCard({ product, onToggleLike }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cart/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition relative group cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-2 rounded-md">
          {product.discount}% GIẢM
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Giá: </span>
          <span className="text-red-600 font-semibold text-lg">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              className={`cursor-pointer transition ${
                product.isFavorite ? "text-red-500" : "text-gray-400"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(product.id);
              }}
            />
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                icon={faStar}
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
