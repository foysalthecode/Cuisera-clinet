import { cookies } from "next/headers";
import { env } from "../env";
import { OrderStatusData } from "../action/order.action";

const API_URL = env.API_URL;

export const orderService = {
  getIncomingOrder: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/provider/meals/orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, erro: null };
    } catch (err) {
      return { data: null, error: { message: "Order Retrive Failed" } };
    }
  },
  updateOrderStatus: async function (id: string, statusData: OrderStatusData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/provider/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(statusData),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Update Status Failed" } };
    }
  },

};
