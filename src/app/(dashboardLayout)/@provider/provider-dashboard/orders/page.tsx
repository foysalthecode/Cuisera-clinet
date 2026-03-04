import IncomingOrders from "@/components/modules/order-module/IncomingOrder";
import { orderService } from "@/src/services/order.service";
import { IncomingOrder } from "@/src/types";
import { BiSolidErrorAlt } from "react-icons/bi";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { data } = await orderService.getIncomingOrder();
  const response = data?.data || [];
  return (
    <div>
      {response.error ? (
        <div className="max-w-2xl mx-auto border rounded-xl p-10 bg-red-200 flex flex-col items-center text-center">
          <div>
            <p className="text-5xl text-red-400 text-center">
              <BiSolidErrorAlt />
            </p>
          </div>
          <div className="font-bold">
            <h1>You have been suspended</h1>
            <p>Please contact to admin</p>
            <p>email : admin.foysal@gmail.com</p>
          </div>
        </div>
      ) : (
        <IncomingOrders orders={response}></IncomingOrders>
      )}
    </div>
  );
}
