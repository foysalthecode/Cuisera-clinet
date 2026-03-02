"use server";

import { orderService } from "../services/order.service";
import { MealOrderData, OrderStatusData } from "../types";

export const updateOrderStats = async (
  id: string,
  statusData: OrderStatusData,
) => {
  const res = await orderService.updateOrderStatus(id, statusData);
  return res;
};

export const createOrder = async (orderData: MealOrderData) => {
  const res = await orderService.createOrder(orderData);
  return res;
};
