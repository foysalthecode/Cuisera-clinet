import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/src/env";
import { userService } from "@/src/services/user.service";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export default function CreateMealFormServer() {
  const createMeal = async (formData: FormData) => {
    "use server";

    const { data } = await userService.getSession();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const mealPrice = formData.get("price") as string;
    const category = formData.get("category") as string;
    const price = Number(mealPrice);
    const userId = data.user.id;
    const mealData = {
      title,
      description,
      category,
      userId,
      price,
    };

    const cookieStore = await cookies();
    const res = await fetch(`${BACKEND_URL}/api/provider/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(mealData),
    });
    if (res.ok) {
      revalidateTag("mealData", "max");
      //   updateTag("mealData") this updateTag behave instantly
    }
  };
  return (
    <div>
      <Card className="max-w-6xl">
        <CardHeader>
          <CardTitle>Post new Meal</CardTitle>
          <CardDescription>Write Down you Meal Info</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="meal-form" action={createMeal}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Your Meal Name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description (e.g about you meal)"
                  required
                />
              </Field>
              <div className="flex justify-evenly w-full gap-2">
                <Field className="w-1/2">
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input type="number" id="price" name="price" required />
                </Field>
                <Field className="w-1/2">
                  <FieldLabel>Category</FieldLabel>
                  <Select name="category" required>
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="BURGER">Burger</SelectItem>
                        <SelectItem value="PIZZA">Pizza</SelectItem>
                        <SelectItem value="MILK SHAKE">Milk Shake</SelectItem>
                        <SelectItem value="CHICKEN">Chicken</SelectItem>
                        <SelectItem value="POROTA">Porota</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="meal-form" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
