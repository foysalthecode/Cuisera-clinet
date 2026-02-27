import CreateMealFormServer from "@/components/modules/provider/createMeal/CreateMealFormServer";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";

export default async function CreateMeal() {
  const { data } = await mealService.getAllMeals();

  return (
    <div>
      <CreateMealFormServer></CreateMealFormServer>
      {data.data.data.map((item: Meals) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
