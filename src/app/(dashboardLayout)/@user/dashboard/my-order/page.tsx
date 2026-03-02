import OwnOrderCard from "@/components/modules/order-module/OwnOrderCard";
import { orderService } from "@/src/services/order.service";
import { OwnOrderStatus } from "@/src/types";

export default async function () {
  const { data } = await orderService.getownOrder();
  const response = data?.data;
  return (
    <div>
      <div>
        {response.map((order: OwnOrderStatus) => (
          <OwnOrderCard key={order.id} order={order}></OwnOrderCard>
        ))}
      </div>
    </div>
  );
}
