export interface Carts {
  id: string;
  userId: string;
  mealId: string;
  createdAt: string;
  updatedAt: string;
  meal: {
    title: string;
    thumbnail: string | null;
    price: number;
  };
}

export interface CartResponse {
  success: boolean;
  data: Carts[];
}

export interface CartData {
  userId: string;
  mealId: string;
}
