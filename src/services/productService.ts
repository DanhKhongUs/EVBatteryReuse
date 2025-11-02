import httpRequest from "../utils/httpRequest";

export interface SellVehicle {
  category: "Xe" | "Pin";
  name: string;
  brand: string;
  price: number;
  date: Date;
  status: "Mới" | "Cũ";
  description: string;
  images: string[];
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
    const payload = {
      category: data.category,
      name: data.name,
      brand: data.brand,
      price: data.price,
      date: data.date.toISOString(),
      status: data.status,
      description: data.description,
      images: data.images,
      details: data.details,
    };

    const res = await httpRequest.post("/products", payload, {
      headers: { "Content-Type": "application/json" },
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
