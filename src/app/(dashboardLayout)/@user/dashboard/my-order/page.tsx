import OwnOrderCard from "@/components/modules/order-module/OwnOrderCard";
import { orderService } from "@/src/services/order.service";
import { OwnOrderStatus } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function () {
  const { data } = await orderService.getownOrder();
  const response = data?.data || [];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {response.map((order: OwnOrderStatus) => (
          <OwnOrderCard key={order.id} order={order}></OwnOrderCard>
        ))}
      </div>
    </div>
  );
}
