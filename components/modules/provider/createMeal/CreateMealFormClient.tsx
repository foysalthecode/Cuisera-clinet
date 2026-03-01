"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { createMeal } from "@/src/action/meal.action";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import * as z from "zod";

const mealSchema = z.object({
  title: z
    .string()
    .min(3, "Title Must be at least Minimum 3 Character")
    .max(100, "Title Must be less than Maximum 100 Character"),
  description: z
    .string()
    .min(10, "Description must be At Leaste Minimum 10 Character")
    .max(200, "Description must be less than 200 Character"),
  category: z.string(),
  userId: z.string(),
  price: z.string(),
});

export default function CreateMealFormClient({ UserId }: { UserId: string }) {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      userId: "",
      price: "",
    },
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value }) => {
      const title = value.title;
      const description = value.description;
      const category = value.category;
      const userId = UserId as string;
      const price = Number(value.price);
      const toasId = toast.loading("Uploading Meal..");
      const mealData = {
        title,
        description,
        category,
        userId,
        price,
      };
      try {
        const res = await createMeal(mealData);
        console.log("from meal create", res);
        if (!res.data.success) {
          toast.error("Meal Upload Failed", { id: toasId });
          return;
        }
        toast.success("Meal Uploaded Successfully", { id: toasId });
        form.reset();
      } catch (err) {
        toast.error("Something Went wrong", { id: toasId });
      }
    },
  });

  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <CardTitle>Post new Meal</CardTitle>
        <CardDescription>Write Down you Meal Info</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="meal-form"
          onSubmit={(e) => {
            (e.preventDefault(), form.handleSubmit());
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Your Meal Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Description (e.g about you meal)"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </Field>
                );
              }}
            />
            <div className="flex justify-evenly w-full gap-2">
              <form.Field
                name="price"
                children={(field) => {
                  return (
                    <Field className="w-1/2">
                      <FieldLabel htmlFor="price">Price</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </Field>
                  );
                }}
              />
              <form.Field
                name="category"
                children={(field) => {
                  return (
                    <Field className="w-1/2">
                      <FieldLabel>Category</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value: string) =>
                          field.handleChange(value)
                        }
                        required
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="BURGER">Burger</SelectItem>
                            <SelectItem value="PIZZA">Pizza</SelectItem>
                            <SelectItem value="MILK SHAKE">
                              Milk Shake
                            </SelectItem>
                            <SelectItem value="CHICKEN">Chicken</SelectItem>
                            <SelectItem value="POROTA">Porota</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  );
                }}
              />
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
  );
}
