import { MealCard } from "@/components/modules/homepage/MealsCard";
import { Dropdown } from "@/components/modules/Meal-Module/DropDown";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { mealService } from "@/src/services/meal.service";
import { Meals } from "@/src/types";

export default async function AllMeals() {
  const searchData = ""
  const { data } = await mealService.getAllMeals(
    {
      sort: "desc",
      search: searchData,
    },
    {
      revalidate: 10,
    },
  );
  return (
    <div>
      <div className="flex justify-between mx-2 gap-2">
        <div>
          <Dropdown></Dropdown>
        </div>
        <div>
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 mx-auto">
        {data?.data?.data?.map((meal: Meals) => (
          <MealCard key={meal.id} meal={meal}></MealCard>
        ))}
      </div>
    </div>
  );
}
