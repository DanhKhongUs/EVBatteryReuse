export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  discount: number;
  description?: string;
  isFavorite?: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IBlog {
  id: string;
  name: string;
  brand: string;
  year: string;
  condition: string;
  description: string;
  images: string[];
  price?: number;
}
