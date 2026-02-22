import { Route } from "../types";

export const adminRoutes: Route[] = [
  {
    title: "Cuisera",
    url: "/",
    items: [
      {
        title: "User Management",
        url: "/ban-user",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
