import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meals } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { MdDeliveryDining } from "react-icons/md";

export function MealCard({ meal }: { meal: Meals }) {
  return (
    <Link href={`${meal.id}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <Image
          height={100}
          width={100}
          src={meal.thumbnail ?? "/placeholder.png"}
          alt="Meal Picture"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardTitle className="text-2xl">{meal.title}</CardTitle>
          <p>${meal.price}</p>
          <p className="flex items-center gap-2 text-gray-500">
            <MdDeliveryDining />
            <small>cash on delivery</small>
          </p>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">View Event</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
