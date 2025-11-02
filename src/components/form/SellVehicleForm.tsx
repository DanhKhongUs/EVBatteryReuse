import { useState } from "react";
import { createProduct, SellVehicle } from "../../services/productService";
import { toast } from "react-toastify";

interface Spec {
  name: string;
  value: string;
}

export default function SellVehicleForm() {
  const [formData, setFormData] = useState({
    category: "Xe",
    name: "",
    brand: "",
    price: "",
    date: "",
    status: "NEW",
    description: "",
    images: [] as string[],
  });

  const [specs, setSpecs] = useState<Spec[]>([
    { name: "Dung lượng pin", value: "" },
    { name: "Công suất motor", value: "" },
    { name: "Quãng đường tối đa", value: "" },
    { name: "Thời gian sạc", value: "" },
    { name: "Trọng lượng xe", value: "" },
  ]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (index: number, value: string) => {
    const updated = [...specs];
    updated[index].value = value;
    setSpecs(updated);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5);

    const base64Images = await Promise.all(files.map((file) => toBase64(file)));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...base64Images].slice(0, 5),
    }));

    setPreviewUrls((prev) => [...prev, ...base64Images].slice(0, 5));
  };

  const handleSubmit = async () => {
    try {
      const payload: SellVehicle = {
        category: formData.category as "Xe" | "Pin",
        name: formData.name,
        brand: formData.brand,
        price: Number(formData.price) || 0,
        date: formData.date
          ? new Date(Number(formData.date), 0, 1)
          : new Date(),
        status: formData.status as "NEW" | "USED",
        description: formData.description,
        images: formData.images,
        details: {
          batteryPercentage: specs[0].value,
          motorCapacity: specs[1].value,
          maximumDistance: specs[2].value,
          chargingTime: specs[3].value,
          weight: specs[4].value,
        },
      };

      await createProduct(payload);
      toast.success("Đăng tin thành công");
      window.location.href = "/blogs";
    } catch (error) {
      console.error(error);
      toast.error("Đăng tin thất bại!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">
        Đăng tin bán xe / pin
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Loại sản phẩm
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="Xe">Xe điện</option>
            <option value="Pin">Pin xe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="VD: VinFast Evo200"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Hãng sản xuất
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="VD: VinFast"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Năm sản xuất</label>
          <input
            type="number"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="2025"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tình trạng</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="NEW">Mới</option>
            <option value="USED">Đã qua sử dụng</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Mô tả chi tiết</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Mô tả thêm về xe/pin..."
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Hình ảnh sản phẩm (tối đa 5 ảnh)
        </label>
        <input type="file" multiple onChange={handleImageUpload} />
        <div className="flex gap-3 mt-3 flex-wrap">
          {previewUrls.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`preview-${i}`}
              className="w-28 h-28 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">⚙️ Thông số kỹ thuật</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">
                {spec.name}
              </label>
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Hủy bỏ
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Đăng tin
        </button>
      </div>
    </div>
  );
}
