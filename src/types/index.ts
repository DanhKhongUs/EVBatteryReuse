export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  discount: number;
  soldOut?: boolean;
  isFavorite?: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
