import { Route } from "../types";

export const providerRoutes: Route[] = [
  {
    title: "Cuisera",
    url: "/",
    items: [
      {
        title: "Create Meal",
        url: "/provider-dashboard/create-meal",
      },
      {
        title: "Orders",
        url: "/provider-dashboard/orders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
