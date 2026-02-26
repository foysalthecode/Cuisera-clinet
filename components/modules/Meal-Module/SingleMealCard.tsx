"use client";
import { addToCart } from "@/src/action/cart.action";
import { MealResponse } from "@/src/types";
import Image from "next/image";
import Swal from "sweetalert2";

export default function SingleMealCard({ data }: { data: MealResponse }) {
  const handleAddToCart = (id: string) => {
    addToCart(id);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="md:w-1/2 h-80 bg-gray-100">
          {data?.data?.thumbnail ? (
            <Image
              src={data.data.thumbnail}
              alt={data.data.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">{data.data.category}</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {data.data.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {data.data.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-semibold text-gray-900">
                ৳ {data.data.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {/* Order Button */}
              <button className="px-6 py-2 text-sm font-medium rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">
                Order Now
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(data.data.id)}
                className="px-6 py-2 text-sm font-medium rounded-full bg-gray-900 text-white hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
