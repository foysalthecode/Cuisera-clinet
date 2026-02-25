import { cookies } from "next/headers";
import { env } from "../env";
import { userService } from "./user.service";

const BACKEND_URL = env.BACKEND_URL;

export const CartService = {
  getCart: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/cart`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Cannot Get The Cart" } };
    }
  },
  AddToCart: async function (mealId: string) {
    try {
      const { data } = await userService.getSession();
      const userId = data.user.id as string;
      const cartData = { userId, mealId };
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(cartData),
      });
      const result = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Unable to Post blog" },
        };
      }

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Cannot added to Cart" } };
    }
  },
  deleteFromCart: async function (cartId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Cannot delete,something went wrong" },
      };
    }
  },
};
