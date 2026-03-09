"use client";

import { deleteMeal } from "@/src/action/meal.action";
import { mealService } from "@/src/services/meal.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteButton({ mealId }: { mealId: string }) {
  const router = useRouter();
  const handleMealDelete = () => {
    const deletemeal = async () => {
      const toastId = toast.loading("Deleting...");
      try {
        const res = await deleteMeal(mealId);
        if (res.data.success) {
          toast.success("Deleted", { id: toastId });
          router.refresh();
        }
      } catch (err) {
        toast.error("Delete Unsuccessfull", { id: toastId });
      }
    };
    Swal.fire({
      title: "Delete this Meal?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deletemeal();
      }
    });
  };

  return (
    <span onClick={handleMealDelete} className="text-xl text-red-400">
      <MdOutlineDeleteOutline />
    </span>
  );
}
