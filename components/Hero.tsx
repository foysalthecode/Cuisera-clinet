import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { IoFastFoodOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import hero from "./images/hero.jpg";

const Hero = ({
  heading = "Exceptional Dining Crafted with Passion & Flavor",
  description = "Fresh ingredients, bold recipes, and warm hospitality. Guests can savor unforgettable meals made to bring people together.",
  button = {
    text: "Checkout Meals",
    icon: <IoFastFoodOutline />,
    url: "/meals",
  },
  trustText = "Rated by 25.000+ Customers in whole bd",
  imageAlt = "Cuisera Restaurant picture",
}) => {
  return (
    <section className={cn("overflow-hidden py-32")}>
      <div className="w-full mx-auto">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" asChild>
                <Link href={button.url}>
                  {button.text} {button.icon}
                </Link>
              </Button>
              {trustText && (
                <div className="text-xs text-muted-foreground">{trustText}</div>
              )}
            </div>
          </div>
          <div className="relative w-9/12 h-96 mx-auto">
            <Image
              // height={400}
              // width={400}
              src={hero}
              alt={imageAlt}
              fill
              className="mx-auto h-full w-full max-w-5xl rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
