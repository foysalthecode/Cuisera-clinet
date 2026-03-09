"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateMeal } from "@/src/action/meal.action";
import { Meals } from "@/src/types";
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
  price: z.string(),
});

export default function UpdateMealForm({
  meal,
  mealId,
}: {
  meal: Meals;
  mealId: string;
}) {
  const form = useForm({
    defaultValues: {
      title: meal.title,
      description: meal.description,
      price: meal.price || "",
    },
    onSubmit: async ({ value }) => {
      const title = value.title;
      const description = value.description;
      const price = Number(value.price);
      const mealData = { title, description, price };
      const toastId = toast.loading("Updating..");
      try {
        const res = await updateMeal(mealId, mealData);
        if (res.data.success) {
          toast.success("Updated", { id: toastId });
        }
      } catch (err) {
        toast.error("something went wrong", { id: toastId });
      }
    },
  });
  return (
    <Card>
      <CardContent>
        <form
          id="meal-update"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
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
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </Field>
              );
            }}
          />
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
        </form>
      </CardContent>
      <CardFooter>
        <Button form="meal-update" type="submit" className="w-full">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
