"use server";

import { updateTag } from "next/cache";
import {
  MealParams,
  mealService,
  ServiceOptions,
} from "../services/meal.service";
import { MealData } from "../types";

export const getAllMeals = async (
  params?: MealParams,
  options?: ServiceOptions,
) => {
  const res = await mealService.getAllMeals(params, options);
  return res;
};

export const getSingleMeal = async (id: string) => {
  return await mealService.getSingleMeal(id);
};

export const createMeal = async (mealData: MealData) => {
  const res = await mealService.createMeal(mealData, { cache: "no-store" });
  updateTag("mealData");
  return res;
};
