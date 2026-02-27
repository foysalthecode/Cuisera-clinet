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
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const mealSchema = z.object({
  title: z
    .string()
    .min(3, "Title Must be at least Minimum 3 Character")
    .max(100, "Title Must be less than Maximum 100 Character"),
  description: z.string(),
  category: z.string(),
  userId: z.string(),
  price: z.number(),
});

export default function CreateMealFormClient() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      userId: "",
      price: 0,
    },
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="name@example.com"
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
                      placeholder="Description (e.g about you meal)"
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
                      <Select name={field.name} required>
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
