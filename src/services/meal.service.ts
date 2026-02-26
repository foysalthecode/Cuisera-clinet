import { env } from "../env";

const API_URL = env.API_URL;

interface MealParams {
  sort?: string;
  search?: string;
}

interface ServiceOptions {
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
};
