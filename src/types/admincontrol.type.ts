export interface OrderTypes {
  id: string;
  status: string;
  address: string;
  userId: string;
  mealId: string;
  meals: {
    title: string;
    isPublished: boolean;
    createdAt: string;
  };
}

export interface OrderStatusType {
  pending: string;
  preparing: string;
  ready: string;
  delivered: string;
  canceled: string;
  totalOrder: string;
}

export interface UsersTypes {
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
}

export interface StatusUpdateData {
  status: string;
}
