"use server";

import { updateTag } from "next/cache";
import { MealParams, mealService } from "../services/meal.service";
import { MealData } from "../types";

export const getAllMeals = async (params?: MealParams) => {
  const res = await mealService.getAllMeals(params);
  return res;
};

export const getSingleMeal = async (id: string) => {
  return await mealService.getSingleMeal(id);
};

export const createMeal = async (mealData: MealData) => {
  const res = await mealService.createMeal(mealData);
  updateTag("mealData");
  return res;
};
