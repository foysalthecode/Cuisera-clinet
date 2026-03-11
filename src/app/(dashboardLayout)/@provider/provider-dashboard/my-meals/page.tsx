import MyMealCard from "@/components/modules/Meal-Module/MyMealCard";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MyMealsPage() {
  const { data } = await mealService.getMyMeal();
  const response = data?.data;
  console.log("my meals", response);
  return (
    <div>
      {response.length > 0 ? (
        <div className="space-y-2">
          <div className="border rounded-lg p-3">
            <h1 className="text-2xl font-bold text-green-400">
              Total Meal: {response.length}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {response.map((meal: Meals) => (
              <MyMealCard key={meal.id} meal={meal}></MyMealCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 text-3xl">
                🍽️
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Meals Yet
            </h2>

            <p className="my-3 text-sm text-gray-500">
              You haven't added any meals yet. Start by creating your first
              meal.
            </p>

            <Link
              href={"/provider-dashboard/create-meal"}
              className="m-6 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Add Meal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
