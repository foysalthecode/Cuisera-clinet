import { Button } from "@/components/ui/button";
import { deleteOwnOrder } from "@/src/action/order.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteOrderButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Loading");
    try {
      const res = await deleteOwnOrder(id);
      if (!res.data.success) {
        return toast.error("Order Canecl Failed", { id: toastId });
      }
      toast.success("Cancelled", { id: toastId });
      router.refresh();
      return;
    } catch (err) {
      return toast.error("Internal Server Error", { id: toastId });
    }
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
