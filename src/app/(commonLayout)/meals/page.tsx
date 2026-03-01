import { MealCard } from "@/components/modules/homepage/MealsCard";
import { SelectGroups } from "@/components/modules/Meal-Module/Seletec";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { mealService } from "@/src/services/meal.service";
import { userService } from "@/src/services/user.service";
import { Meals } from "@/src/types";
import PaginationControlls from "@/components/ui/pagination-controll";

export const dynamic = "force-dynamic";

export default async function AllMeals({
  searchParams,
}: {
  searchParams: Promise<{ sort: string; search: string; page: string }>;
}) {
  const { data: userData } = await userService.getSession();
  let isAuthenticated = false;
  if (userData) {
    isAuthenticated = true;
  }
  const { sort } = await searchParams;
  const { search } = await searchParams;
  const { page } = await searchParams;
  const { data } = await mealService.getAllMeals(
    { sort, search, page },
    { revalidate: 10 },
  );
  const response = data?.data?.data || [];
  const pagination = data?.data?.pagination || {
    limit: 8,
    page: 1,
    total: 0,
    totalPage: 1,
  };
  // {
  //   search: searchData,
  // },
  // {
  //   revalidate: 10,
  // },
  return (
    <div>
      <div className="flex justify-between max-w-11/12 mx-auto">
        <div>
          <SelectGroups></SelectGroups>
        </div>
        <div>
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
      </div>
      <div>
        {response.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 max-w-11/12 mx-auto">
            {response.map((meal: Meals) => (
              <MealCard
                key={meal.id}
                meal={meal}
                isAuthenticated={isAuthenticated}
              ></MealCard>
            ))}
          </div>
        ) : (
          <div>No</div>
        )}
      </div>
      <div className="max-w-5xl mx-auto pb-6">
        <PaginationControlls meta={pagination}></PaginationControlls>
      </div>
    </div>
  );
}
