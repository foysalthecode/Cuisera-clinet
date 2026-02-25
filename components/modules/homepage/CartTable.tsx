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
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

export function CartTable({
  data,
  totalAmount,
}: {
  data: CartResponse;
  totalAmount: number;
}) {
  const handledelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFromCart(id);
      }
    });
  };
  return (
    <Table>
      <TableCaption>A list of your recent Added Items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Meal</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Action</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map(
          (cart: Carts) => (
            console.log(cart.id),
            (
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
            )
          ),
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
