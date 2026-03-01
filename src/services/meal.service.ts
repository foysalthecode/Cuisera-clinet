import { cookies } from "next/headers";
import { env } from "../env";
import { MealData } from "../types";

const API_URL = env.API_URL;

export interface MealParams {
  sort?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const mealService = {
  getAllMeals: async function (params?: MealParams, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/api/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config, tags: ["mealData"] };

      const res = await fetch(url.toString(), config);
      // const res = await fetch(`${API_URL}/api/meals`, {
      //   next: { revalidate: 10 },
      // });

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Cannot Get The Meals" } };
    }
  },
  getSingleMeal: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/meals/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Cannot get the meal" } };
    }
  },
  createMeal: async function (mealData: MealData) {
    console.log("meal data from meal service", mealData);
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/provider/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealData),
      });
      const data = await res.json();
      console.log("data from meal service", data);
      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Meal Upload Failed" },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Meal Upload Failed" } };
    }
  },
  getSingleProviderMeal: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/providers/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "Provider with Meal data Retrive Failed" };
    }
  },
};
