export interface Meals {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  status: string;
  review: string | null;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface MealResponse {
  success: boolean;
  data: Meals;
}
