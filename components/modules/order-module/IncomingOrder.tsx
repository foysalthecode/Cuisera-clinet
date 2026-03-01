"use client";

import { Badge } from "@/components/ui/badge";
import { IncomingOrder, Props } from "@/src/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { updateOrderStats } from "@/src/action/order.action";

const orderStatusSchema = z.object({
  orderId: z.string(),
  value: z.string(),
});

export default function IncomingOrders({ orders }: { orders: Props }) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const onChage = async (id: string, value: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("id", id.toString());
  //   params.set("value", value.toString());
  //   router.push(`?${params.toString()}`);
  // };

  const form = useForm({
    defaultValues: {
      orderId: "",
      value: "",
    },
    validators: {
      onSubmit: orderStatusSchema,
    },
    onSubmit: async ({ value }) => {
      const orderId = value.orderId;
      const status = value.value;
      const statusData = {
        status,
      };
      const toastId = toast.loading("Updating Status");

      try {
        const res = await updateOrderStats(orderId, statusData);
        if (!res.data.success) {
          toast.error("Meal Upload Failed", { id: toastId });
          return;
        }
        toast.success("Update Successfull", { id: toastId });
      } catch (err) {
        toast.error("Internal Server Error", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Incoming Orders
          </h2>
          <p className="text-sm text-slate-500">Live view of new meal orders</p>
        </div>

        {/* Orders */}
        <form
          id="status-update"
          onSubmit={(e) => {
            (e.preventDefault(), form.handleSubmit());
          }}
        >
          <div className="space-y-4">
            {orders?.result.map((order: IncomingOrder) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between">
                  {/* Left Side */}
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {order.meals?.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Address: {order.address}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Status Badge */}
                    {order.status === "CANCELED" ? (
                      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                        {order.status}
                      </Badge>
                    ) : order.status === "PENDING" ? (
                      <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                        {order.status}
                      </Badge>
                    ) : order.status === "PREPARING" ? (
                      <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                        {order.status}
                      </Badge>
                    ) : order.status === "READY" ? (
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {order.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                        {order.status}
                      </Badge>
                    )}

                    {/* Dropdown instead of button */}
                    <form.Field
                      name="value"
                      children={(field) => {
                        return (
                          <Select
                            name={field.name}
                            // value={order.status}
                            onValueChange={(value: string) => {
                              field.handleChange(value);
                              form.setFieldValue("orderId", order.id);
                            }}
                          >
                            <SelectTrigger className="w-full max-w-48">
                              <SelectValue placeholder={order.status} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="CANCELED">Cancel</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PREPARING">
                                  Preparing
                                </SelectItem>
                                <SelectItem value="READY">Ready</SelectItem>
                                <SelectItem value="DELIVERD">
                                  Deliverd
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                    <Button form="status-update" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* <Select onValueChange={(value) => onChage(order.id, value)}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder={order.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="CANCELED">Cancel</SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PREPARING">Preparing</SelectItem>
                          <SelectItem value="READY">Ready</SelectItem>
                          <SelectItem value="DELIVERD">Deliverd</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select> */
}
