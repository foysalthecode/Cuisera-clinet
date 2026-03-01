import { CartTable } from "@/components/modules/homepage/CartTable";
import { getCartData } from "@/src/action/cart.action";
import { Carts } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function Cart() {
  const { data } = await getCartData();
  const totalAmount = data?.data?.reduce((sum: number, cart: Carts) => {
    return sum + cart.meal.price;
  }, 0);
  return (
    <div className="w-10/12 mx-auto">
      <CartTable data={data} totalAmount={totalAmount}></CartTable>
    </div>
  );
}
