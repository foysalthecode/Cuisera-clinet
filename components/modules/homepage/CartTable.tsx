"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteFromCart } from "@/src/action/cart.action";
import { CartResponse, Carts } from "@/src/types";
import { useRouter } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

export function CartTable({
  data,
  totalAmount,
}: {
  data: CartResponse;
  totalAmount: number;
}) {
  const router = useRouter();
  const handledelete = (id: string) => {
    Swal.fire({
      title: "Delete From Cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFromCart(id);
        router.refresh();
      }
    });
  };
  return (
    <div className="border-t rounded-t-md">
      <Table>
        <TableCaption>A list of your recent Added Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center m-5">
                Your Cart Is Empty
              </TableCell>
            </TableRow>
          )}
          {data?.data?.map((cart: Carts) => (
            <TableRow key={cart.id}>
              <TableCell className="font-medium">{cart.meal.title}</TableCell>
              <TableCell>Cash on Delivery</TableCell>
              <TableCell>
                <p onClick={() => handledelete(cart.id)}>
                  <MdOutlineDeleteOutline className="text-red-500 text-2xl" />
                </p>
              </TableCell>
              <TableCell className="text-right">{cart.meal.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
