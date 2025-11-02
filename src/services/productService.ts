import httpRequest from "../utils/httpRequest";

export interface SellVehicle {
  category: "Xe" | "Pin";
  name: string;
  brand: string;
  price: number;
  date: Date;
  status: "Mới" | "Cũ";
  description: string;
  images: File[];
  details: {
    batteryPercentage: string;
    motorCapacity: string;
    maximumDistance: string;
    chargingTime: string;
    weight: string;
  };
}

export const createProduct = async (data: SellVehicle) => {
  try {
    const formData = new FormData();

    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", data.price.toString());
    formData.append("date", data.date.toISOString());
    formData.append("status", data.status);
    formData.append("description", data.description);

    data.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("details", JSON.stringify(data.details));

    const res = await httpRequest.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await httpRequest.get("/products");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
