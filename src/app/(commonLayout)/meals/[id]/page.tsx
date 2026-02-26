import SingleMealCard from "@/components/modules/Meal-Module/SingleMealCard";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";

export async function generateStaticParams() {
  const { data } = await mealService.getAllMeals();
  return data?.data?.data?.map((meal: Meals) => ({ id: meal.id })).splice(0, 3);
}

export default async function SingleMeal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await mealService.getSingleMeal(id);
  return (
    <div>
      <SingleMealCard data={data}></SingleMealCard>
    </div>
  );
}
