import { cookies } from "next/headers";
import { env } from "../env";
import { StatusUpdateData } from "../types";

const API_URL = env.API_URL;

export const adminService = {
  getAllOrder: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admincontroll/allorders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "cannot retrive data" };
    }
  },
  getAllUser: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admincontroll/allusers`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "Cannot Retrive Users data" };
    }
  },
  updateUserStatus: async (id: string, statusData: StatusUpdateData) => {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {};

      config.next = { ...config, tags: ["user-status"] };

      const res = await fetch(`${API_URL}/api/admincontroll/status/${id}`, {
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
      return { data: null, error: "Status Update Failed" };
    }
  },
};
