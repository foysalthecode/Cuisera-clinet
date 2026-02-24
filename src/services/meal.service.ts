import { env } from "../env";

const API_URL = env.API_URL;
export const mealService = {
  getAllMeals: async function () {
    try {
      const res = await fetch(`${API_URL}/api/meals`);

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
