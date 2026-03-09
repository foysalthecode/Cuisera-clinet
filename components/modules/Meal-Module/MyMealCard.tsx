import { Meals } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { MdEditNote, MdOutlineDeleteOutline } from "react-icons/md";
import DeleteButton from "../provider/deleteMeal/DeleteMealButton";

export default function MyMealCard({ meal }: { meal: Meals }) {
  return (
    <div
      key={meal?.id}
      className="group rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-slate-100">
        {meal?.thumbnail ? (
          <Image
            src={meal.thumbnail}
            alt={meal?.title || "Meal"}
            fill
            className="object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-sm font-medium text-slate-500">
            No image
          </div>
        )}
      </div>

      {/* Title + Price */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
          {meal?.title || "Untitled meal"}
        </h3>
        <div className="flex justify-between items-center gap-1">
          <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            ৳{meal?.price ?? "—"}
          </span>
          <Link
            href={`/provider-dashboard/update-meal/${meal.id}`}
            className="text-xl"
          >
            <MdEditNote />
          </Link>
          <DeleteButton mealId={meal.id}></DeleteButton>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
        {meal?.description || "No description provided."}
      </p>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {meal?.category || "Uncategorized"}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {meal?.status || "—"}
        </span>
        {meal?.isPublished ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Draft
          </span>
        )}
        {meal?.isFeatured ? (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Featured
          </span>
        ) : null}
      </div>
    </div>
  );
}
