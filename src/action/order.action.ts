"use server";

import { orderService } from "../services/order.service";

export interface OrderStatusData {
  status: string;
}

export const updateOrderStats = async (
  id: string,
  statusData: OrderStatusData,
) => {
  const res = await orderService.updateOrderStatus(id, statusData);
  return res;
};
