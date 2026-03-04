"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderTypes } from "@/src/types";

export default function AllOrderCard({ order }: { order: OrderTypes }) {
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
