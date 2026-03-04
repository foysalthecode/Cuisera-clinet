import AllOrderCard from "@/components/modules/admin/AllOrderCard";
import OrderStatusCard from "@/components/modules/admin/OrderStatusCard";
import { adminService } from "@/src/services/admin.service";
import { OrderTypes } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function () {
  const { data } = await adminService.getAllOrder();
  const response = data?.data || [];
  const pending =
    response?.filter((order: OrderTypes) => order.status === "PENDING")
      .length ?? 0;
  const preparing =
    response?.filter((order: OrderTypes) => order.status === "PREPARING")
      .length ?? 0;
  const ready =
    response?.filter((order: OrderTypes) => order.status === "READY").length ??
    0;
  const delivered =
    response?.filter((order: OrderTypes) => order.status === "DELIVERD")
      .length ?? 0;
  const canceled =
    response?.filter((order: OrderTypes) => order.status === "CANCELED")
      .length ?? 0;
  const totalOrder = response?.length;
  const filterData = {
    pending,
    preparing,
    ready,
    delivered,
    canceled,
    totalOrder,
  };
  return (
    <div>
      <OrderStatusCard filterData={filterData}></OrderStatusCard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 shadow-lg border rounded-2xl p-3">
        {response.map((order: OrderTypes) => (
          <AllOrderCard key={order.id} order={order}></AllOrderCard>
        ))}
      </div>
    </div>
  );
}
