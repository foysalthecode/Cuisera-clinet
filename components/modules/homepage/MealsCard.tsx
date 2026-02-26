"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/src/action/cart.action";
import { Meals } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { MdDeliveryDining } from "react-icons/md";
import Swal from "sweetalert2";

export function MealCard({ meal }: { meal: Meals }) {
  const handleAddToCart = async (id: string) => {
    addToCart(id);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      {/* <Image
        height={100}
        width={100}
        src={meal.thumbnail ?? "/placeholder.png"}
        alt="Meal Picture"
        className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40"
      /> */}
      {meal.thumbnail ? (
        <Image
          src={meal.thumbnail}
          alt={meal.title}
          className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40"
        />
      ) : (
        <div className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40">
          No Image Available
        </div>
      )}
      <CardHeader>
        <CardAction>
          {meal.isFeatured && <Badge variant="secondary">Featured</Badge>}
        </CardAction>
        <CardTitle className="text-2xl">{meal.title}</CardTitle>
        <p>৳ {meal.price}</p>
        <p className="flex items-center gap-2 text-gray-500">
          <MdDeliveryDining />
          <small>cash on delivery</small>
        </p>
      </CardHeader>
      <CardFooter>
        <div className="w-full flex items-center gap-2">
          <Link className="w-10/12" href={`/meals/${meal.id}`}>
            <Button className="w-full">Checkout</Button>
          </Link>
          <Button
            onClick={() => handleAddToCart(meal.id)}
            className="border rounded-lg p-2.5 bg-white text-black hover:bg-gray-300"
          >
            <CiShoppingCart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
