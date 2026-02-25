"use server";
import { CartService } from "../services/cart.service";

export const getCartData = async () => {
  return await CartService.getCart();
};

export const addToCart = async (id: string) => {
  const mealId = id;
  const res = await CartService.AddToCart(mealId);
  return { res };
};

export const deleteFromCart = async (cartId: string) => {
  const id = cartId;
  const res = await CartService.deleteFromCart(id);
  return res;
};
