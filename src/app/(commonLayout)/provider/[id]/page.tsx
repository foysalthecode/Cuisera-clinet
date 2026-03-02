import ProviderWithMeals from "@/components/modules/Meal-Module/MealProvider";
import { mealService } from "@/src/services/meal.service";

export default async function SingleProviderWithMenu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await mealService.getSingleProviderMeal(id);
  const providermeal = data.data;
  return (
    <div>
      <ProviderWithMeals provider={providermeal}></ProviderWithMeals>
    </div>
  );
}
