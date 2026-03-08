import { Button } from "@/components/ui/button";
import { deleteOwnOrder } from "@/src/action/order.action";
import { orderService } from "@/src/services/order.service";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteOrderButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Loading");
    const res = await deleteOwnOrder(id);
    toast.success("Cancelled", { id: toastId });
    router.refresh();
    console.log(res);
  };

  return (
    <Button
      onClick={handleDeleteOrder}
      className="border bg-white text-red-400 shadow-sm hover:bg-gray-100 hover:shadow-md"
    >
      Cancel
    </Button>
  );
}
