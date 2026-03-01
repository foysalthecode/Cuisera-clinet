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
