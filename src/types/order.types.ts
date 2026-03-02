export type OrderStatus =
  | "CANCELED"
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | (string & {});

export interface IncomingOrder {
  id: string;
  status: string;
  address: string;
  userId: string;
  mealId: string;
  meals: {
    title: string;
  };
}

export interface Props {
  result: IncomingOrder[];
}

export interface MealOrderData {
  userId: string;
  mealId: string;
  address: string;
}

export interface OrderStatusData {
  status: string;
}

export interface OwnOrderStatus {
  id: string;
  status: string;
  address: string;
  userId: string;
  mealId: string;
  meals: {
    title: string;
    price: number;
  };
}
