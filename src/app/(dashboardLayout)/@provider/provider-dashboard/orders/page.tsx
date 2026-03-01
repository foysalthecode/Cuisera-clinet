import IncomingOrders from "@/components/modules/order-module/IncomingOrder";
import { orderService } from "@/src/services/order.service";

export default async function OrdersPage() {
  const { data } = await orderService.getIncomingOrder();
  const response = data?.data;

  return (
    <div>
      <IncomingOrders orders={response}></IncomingOrders>
    </div>
  );
}
