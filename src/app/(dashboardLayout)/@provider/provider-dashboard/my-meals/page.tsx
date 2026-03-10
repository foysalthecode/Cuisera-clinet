import MyMealCard from "@/components/modules/Meal-Module/MyMealCard";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function MyMealsPage() {
  const { data } = await mealService.getMyMeal();
  const response = data?.data;
  console.log(response);
  return (
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
  );
}
