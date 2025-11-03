import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, SellVehicle } from "../../services/productService";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<SellVehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!id) return;
        const res = await getProductById(id);
        setListing(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  if (!listing)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Không tìm thấy bài đăng này.
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <img
              src={listing.images?.[0] || "https://via.placeholder.com/400"}
              alt={listing.name}
              className="w-full h-80 object-cover rounded-lg shadow-sm"
            />

            {listing.images && listing.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {listing.images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {listing.name}
              </h1>
              <p className="text-gray-500 mb-4">
                Mã sản phẩm:{" "}
                <span className="font-medium text-gray-700">{id}</span>
              </p>

              <div className="space-y-2 text-lg text-gray-700">
                <p>
                  <span className="font-semibold">Hãng:</span> {listing.brand}
                </p>
                <p>
                  <span className="font-semibold">Danh mục:</span>{" "}
                  {listing.category === "VEHICLE" ? "Xe" : "Pin"}
                </p>
                <p>
                  <span className="font-semibold">Năm sản xuất:</span>{" "}
                  {new Date(listing.date).getFullYear()}
                </p>
                <p>
                  <span className="font-semibold">Tình trạng:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      listing.status === "NEW"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {listing.status === "NEW" ? "Mới" : "Đã qua sử dụng"}
                  </span>
                </p>
              </div>

              <div className="mt-6 border-t pt-4">
                <p className="text-2xl font-bold text-pink-600">
                  {listing.price
                    ? `${listing.price.toLocaleString()} VNĐ`
                    : "Chưa có giá"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 border-t">
          <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Thông số kỹ thuật
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium">Dung lượng pin:</span>{" "}
              {listing.details.batteryPercentage}
            </p>
            <p>
              <span className="font-medium">Công suất động cơ:</span>{" "}
              {listing.details.motorCapacity}
            </p>
            <p>
              <span className="font-medium">Quãng đường tối đa:</span>{" "}
              {listing.details.maximumDistance}
            </p>
            <p>
              <span className="font-medium">Thời gian sạc:</span>{" "}
              {listing.details.chargingTime}
            </p>
            <p>
              <span className="font-medium">Trọng lượng:</span>{" "}
              {listing.details.weight}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 border-t">
          <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            Mô tả chi tiết
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {listing.description || "Không có mô tả chi tiết."}
          </p>
        </div>

        <div className="px-6 pb-8 text-center">
          <Link
            to="/blogs"
            className="inline-block px-5 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium rounded-lg transition"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    </div>
  );
}
