import OwnOrderCard from "@/components/modules/order-module/OwnOrderCard";
import { orderService } from "@/src/services/order.service";
import { OwnOrderStatus } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function () {
  const { data } = await orderService.getownOrder();
  const response = data?.data || [];
  return (
    <div>
      {response.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {response.map((order: OwnOrderStatus) => (
            <OwnOrderCard key={order.id} order={order}></OwnOrderCard>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-20">
          <div className="border rounded-xl p-8 text-center shadow-sm bg-white max-w-sm w-full">
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>

            <p className="text-gray-500 text-sm">
              You don't have any orders yet. Once customers place orders, they
              will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
