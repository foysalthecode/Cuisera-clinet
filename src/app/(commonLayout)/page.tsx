import { Hero } from "@/components/Hero";
import { CategoryCarousel } from "@/components/modules/homepage/CategoryCarousel";
import { MealCard } from "@/components/modules/homepage/MealsCard";
import { mealService } from "@/src/services/meal.service";
import { isAuthenticated } from "@/src/services/user.service";
import { Meals } from "@/src/types";

export default async function Home() {
  const { data } = await mealService.getAllMeals();
  const categories = data?.data?.data?.map((meal: Meals) => meal.category);
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl font-bold">Cuisines</h1>
        <CategoryCarousel categories={categories}></CategoryCarousel>
      </div>
      <div>
        <h1 className="text-5xl text-center font-bold py-5">Featured</h1>
        <div className="grid md:grid-cols-4 gap-4 p-2 mx-auto">
          {data?.data?.data?.map(
            (meal: Meals) =>
              meal.isFeatured && (
                <MealCard key={meal.id} meal={meal}></MealCard>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
