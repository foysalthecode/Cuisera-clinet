import { Route } from "../types";

export const userRoutes: Route[] = [
  {
    title: "Cuisera",
    url: "/",
    items: [
      {
        title: "My Orders",
        url: "/dashboard/my-order",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
