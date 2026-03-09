import UpdateMealForm from "@/components/modules/provider/updateMeal/UpdateMealForm";
import { mealService } from "@/src/services/meal.service";

export default async function UpdateMealId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await mealService.getSingleMeal(id);
  const response = data?.data;
  return (
    <div>
      <UpdateMealForm meal={response} mealId={id}></UpdateMealForm>
    </div>
  );
}
