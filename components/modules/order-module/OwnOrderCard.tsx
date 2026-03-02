"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OwnOrderStatus } from "@/src/types";
import { CiLocationOn } from "react-icons/ci";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

export default function OwnOrderCard({ order }: { order: OwnOrderStatus }) {
  return (
    <Card className="max-w-7xl my-3 rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        {/* Left Side */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{order.meals.title}</h3>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <CiLocationOn /> {order.address}
          </p>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <BsReverseLayoutTextSidebarReverse /> Order ID:{" "}
            {order.id.slice(0, 8)}...
          </p>
        </div>

        {/* Right Side */}
        <div className="text-right space-y-2">
          <p className="text-lg font-bold">৳ {order.meals.price}</p>

          <Badge
            className={`px-3 py-1 text-xs ${
              order.status === "READY"
                ? "bg-green-100 text-green-700"
                : order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
