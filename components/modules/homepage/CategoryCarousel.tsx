import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = ["PIZZA", "BURGER", "CHICKEN", "MILK SHAKE", "POROTA"];

export function CategoryCarousel() {
  return (
    <Carousel className="w-full sm:max-w-xs md:max-w-sm">
      <CarouselContent className="-ml-1">
        {categories.map((category, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <p>{category}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
