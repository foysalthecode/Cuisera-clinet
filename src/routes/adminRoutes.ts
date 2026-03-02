import { Route } from "../types";

export const adminRoutes: Route[] = [
  {
    title: "Cuisera",
    url: "/",
    items: [
      {
        title: "All Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "All Users",
        url: "/admin-dashboard/all-users",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
