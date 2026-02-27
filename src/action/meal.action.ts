"use server";

import { MealParams, mealService } from "../services/meal.service";

export const getAllMeals = async (params?: MealParams) => {
  return await mealService.getAllMeals(params);
};
