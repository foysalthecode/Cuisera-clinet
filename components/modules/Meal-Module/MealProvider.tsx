"use client";

import { ProviderWithMeal } from "@/src/types";
import Image from "next/image";

export default function ProviderWithMeals({
  provider,
}: {
  provider: ProviderWithMeal;
}) {
  console.log("from provider with meal comp", provider.email);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Provider Header Card */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                {provider?.image ? (
                  <Image
                    src={provider.image}
                    alt={provider?.name || "Provider"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-lg font-semibold text-slate-600">
                    {(provider?.name?.[0] || "P").toUpperCase()}
                  </div>
                )}
              </div>

              {/* Provider Info */}
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {provider?.name || "Unknown Provider"}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {provider?.email || "No email"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Role: {provider?.role || "N/A"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Status: {provider?.status || "N/A"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Phone: {provider?.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
                <div className="text-lg font-semibold text-slate-900">
                  {provider.meals.length}
                </div>
                <div className="text-xs text-slate-600">Meals</div>
              </div>
              <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
                <div className="text-lg font-semibold text-slate-900">
                  {provider.meals.filter((m: any) => m?.isPublished).length}
                </div>
                <div className="text-xs text-slate-600">Published</div>
              </div>
              <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
                <div className="text-lg font-semibold text-slate-900">
                  {provider.meals.filter((m: any) => m?.isFeatured).length}
                </div>
                <div className="text-xs text-slate-600">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Posted Meals
            </h2>
            <span className="text-sm text-slate-500">
              {provider.meals.length} items
            </span>
          </div>

          {/* Empty State */}
          {provider.meals.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed bg-slate-50 p-12 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white">
                🍽️
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                No meals found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                This provider hasn’t posted any meals yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {provider.meals.map((meal: any) => (
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
                    <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      ৳{meal?.price ?? "—"}
                    </span>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
