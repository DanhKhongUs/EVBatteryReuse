import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../types";
import { getProducts } from "../../services/productService";

export default function BlogsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await getProducts();
        setListings(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Đang tải tin đăng...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-12 text-pink-600">
        Danh sách tin bán xe / pin
      </h1>

      {listings.length === 0 ? (
        <p className="text-gray-600 italic">Chưa có tin đăng nào.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition"
            >
              <Link to={`/blogs/${item.id}`}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className=" text-gray-500">{item.brand}</p>
                  <p className=" text-gray-500">
                    Năm SX: {item.year} • {item.condition}
                  </p>
                  {item.price && (
                    <p className="text-pink-600 font-semibold mt-2">
                      {item.price.toLocaleString()} VNĐ
                    </p>
                  )}
                  <span className="mt-3 inline-block text-pink-600 hover:underline ">
                    Xem chi tiết →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
