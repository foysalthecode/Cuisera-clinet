"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderStatusType, OrderTypes } from "@/src/types";

export default function AllOrderCard({
  order,
  filterStatus,
}: {
  order: OrderTypes;
  filterStatus: OrderStatusType;
}) {
  return (
    <div>
      <Card className="w-full rounded-2xl border bg-background p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Left Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{order.meals?.title}</h3>

            <p className="text-sm text-muted-foreground">
              Address: {order.address}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">
                Order ID: {String(order.id).slice(0, 8)}…
              </span>

              <Badge
                variant="outline"
                className="rounded-full px-2 py-0.5 text-[10px]"
              >
                {order.meals?.isPublished ? "Published" : "Unpublished"}
              </Badge>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-start">
            <Badge
              className={`px-4 py-1 text-xs font-medium rounded-full ${
                order.status === "DELIVERED"
                  ? "bg-emerald-600 text-white"
                  : order.status === "READY"
                    ? "bg-blue-600 text-white"
                    : order.status === "PREPARING"
                      ? "bg-indigo-600 text-white"
                      : order.status === "PENDING"
                        ? "bg-amber-500 text-white"
                        : "bg-rose-600 text-white"
              }`}
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

{
  /* <Card className="mb-6 w-full rounded-2xl border bg-background p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatBox label="Total" value={total} />
        <StatBox label="Pending" value={pending} color="amber" />
        <StatBox label="Preparing" value={preparing} color="blue" />
        <StatBox label="Ready" value={ready} color="indigo" />
        <StatBox label="Delivered" value={delivered} color="emerald" />
        <StatBox label="Canceled" value={canceled} color="rose" />
      </div>
    </Card> */
}
