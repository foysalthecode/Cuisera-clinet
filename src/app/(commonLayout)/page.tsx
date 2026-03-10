import { Hero } from "@/components/Hero";
import { CategoryCarousel } from "@/components/modules/homepage/CategoryCarousel";
import { MealCard } from "@/components/modules/homepage/MealsCard";
import { getAllMeals } from "@/src/action/meal.action";
import { userService } from "@/src/services/user.service";
import { Meals } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getAllMeals({}, { revalidate: 10 });
  const response = data?.data?.data || [];
  const isFeatured = response.filter((meal: Meals) => meal.isFeatured);
  const { data: userId } = await userService.getUserProfile();
  const { data: userData } = await userService.getSession();
  let isAuthenticated = false;
  if (userData) {
    isAuthenticated = true;
  }
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl font-bold">Cuisines</h1>
        <CategoryCarousel></CategoryCarousel>
      </div>
      <div>
        <h1 className="text-5xl text-center font-bold py-5">Featured</h1>
        <div className="grid md:grid-cols-4 gap-4 p-2 max-w-7xl mx-auto">
          {response.map(
            (meal: Meals) =>
              meal.isFeatured && (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  userId={userId}
                  isAuthenticated={isAuthenticated}
                ></MealCard>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
