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
      ) : response.result.length > 0 ? (
        <IncomingOrders orders={response}></IncomingOrders>
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 text-3xl">
                📦
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Incoming Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no incoming orders. New orders will appear
              here once customers place them.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
