"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/src/action/order.action";
import { Meals } from "@/src/types";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbTruckDelivery } from "react-icons/tb";
import * as z from "zod";

const addressSchema = z.object({
  id: z.string(),
  address: z
    .string()
    .min(10, "minimum 20 Character required")
    .max(150, "maximum limit reached"),
});

export function OrderDrawer({
  meal,
  userId: id,
}: {
  meal: Meals;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      id: "",
      address: "",
    },
    validators: {
      onSubmit: addressSchema,
    },
    onSubmit: async ({ value }) => {
      const address = value.address;
      const userId = id;
      const mealId = meal.id;
      const data = {
        userId,
        mealId,
        address,
      };
      const toastId = toast.loading("Placing order..");
      try {
        const res = await createOrder(data);
        if (!res.data.success) {
          return toast.error("Order failed", { id: toastId });
        }
        toast.success("Order Successfull", { id: toastId });
        setOpen(false);
      } catch (err) {
        return toast.error("Internal Server Error", { id: toastId });
      }
    },
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Order</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Confirm Your Order</DrawerTitle>
            <DrawerDescription>Write Down You address</DrawerDescription>
          </DrawerHeader>

          <Card className="mb-4 rounded-2xl border bg-background/60 p-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              {meal.thumbnail ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border bg-muted">
                  <Image
                    src={meal.thumbnail}
                    alt={meal.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 overflow-hidden rounded-xl border bg-muted">
                  <p className="text-center items-center text-sm">No Image</p>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-5">
                  {meal.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Confirm this item before ordering
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold">৳ {meal.price}</p>
                <span className="mt-1 inline-flex rounded-full border bg-muted px-2 py-0.5 text-[10px] font-medium">
                  Item
                </span>
              </div>
            </div>
          </Card>

          <Card className="mb-4 rounded-2xl border bg-green-200 p-3 shadow-sm backdrop-blur">
            <div className="flex justify-between items-center font-semibold text-sm">
              <p>Cash On Delivery</p>
              <p className="text-lg">
                <TbTruckDelivery />
              </p>
            </div>
          </Card>

          <form
            id="drawer-from"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="p-4 pb-0">
              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        placeholder="Write your address (e.g dhanmondi,27)"
                        required
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              />
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" form="drawer-from">
              Order
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
