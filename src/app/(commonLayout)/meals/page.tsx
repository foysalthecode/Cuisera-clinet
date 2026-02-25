import { MealCard } from "@/components/modules/homepage/MealsCard";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";

export default async function AllMeals() {
  const { data } = await mealService.getAllMeals();
  return (
    <div className="grid md:grid-cols-4 gap-4 p-2 mx-auto">
      {data?.data?.data?.map((meal: Meals) => (
        <MealCard key={meal.id} meal={meal}></MealCard>
      ))}
    </div>
  );
}
