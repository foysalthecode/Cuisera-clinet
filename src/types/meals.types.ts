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
  user: {
    name: string;
  };
}

export interface MealResponse {
  success: boolean;
  data: Meals;
}

export interface MealData {
  title: string;
  description: string;
  category: string;
  userId: string;
  price: number;
}

export interface ProviderWithMeal {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  status: string;
  meals: Meals[];
}
