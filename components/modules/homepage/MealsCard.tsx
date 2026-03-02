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
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { OrderDrawer } from "../Meal-Module/MealOrderDrawer";

export function MealCard({
  meal,
  isAuthenticated,
  userId,
}: {
  meal: Meals;
  isAuthenticated?: boolean;
  userId: string;
}) {
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
      {meal.thumbnail ? (
        <Image
          src={meal.thumbnail}
          alt={meal.title}
          className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40"
        />
      ) : (
        <div className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40">
          {meal.title}
        </div>
      )}
      <CardHeader>
        <CardAction>
          {meal.isFeatured && <Badge variant="secondary">Featured</Badge>}
        </CardAction>
        <CardTitle className="text-2xl">{meal.title}</CardTitle>
        <Link href={`/provider/${meal.userId}`}>
          Provider <small className="hover:underline">{meal.user.name}</small>
        </Link>
        <div className="flex flex-col">
          <p>৳ {meal.price}</p>
          <p className="flex items-center gap-2 text-gray-500">
            <MdDeliveryDining />
            <small>cash on delivery</small>
          </p>
        </div>
      </CardHeader>
      <CardFooter>
        <div className="w-full flex items-center gap-2">
          <div>
            <OrderDrawer meal={meal} userId={userId}></OrderDrawer>
          </div>

          <Button
            onClick={() => handleAddToCart(meal.id)}
            disabled={!isAuthenticated}
            className="border rounded-lg p-2.5 w-2/12 bg-white text-black hover:bg-gray-300"
          >
            <CiShoppingCart />
          </Button>
          <Link className="w-2/12" href={`/meals/${meal.id}`}>
            <Button className="w-full">
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
