"use client";

import { Meta } from "@/services/courses/types";
import PriceFilter from "./filters/PriceFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const AsideFilter = ({ meta }: { meta: Meta }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // =========================
  // Query Params Logic
  // =========================

  const createQueryString = useCallback(
    (name: string, value: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      const currentValues = params.get(name)
        ? params.get(name)!.split(",")
        : [];

      let updatedValues: string[];

      if (isChecked) {
        updatedValues = [...currentValues, value];
      } else {
        updatedValues = currentValues.filter((v) => v !== value);
      }

      if (updatedValues.length > 0) {
        params.set(name, updatedValues.join(","));
      } else {
        params.delete(name);
      }

      params.set("page", "1");

      return params.toString();
    },
    [searchParams],
  );

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean,
  ) => {
    const queryString = createQueryString(name, value, checked);

    router.push(`?${queryString}`, { scroll: false });
  };

  const handleReset = () => {
    router.push("?", { scroll: false });
  };

  const isChecked = (name: string, value: string) => {
    const current = searchParams.get(name);

    if (!current) return false;

    return current.split(",").includes(value);
  };

  // Filter Content
  const filterContent = (
    <>
      {/* Level */}
      <div className="border-b border-border pb-6">
        <h3 className="mb-4 text-lg font-semibold">المستوى</h3>

        <ul className="space-y-3">
          {[
            { label: "سهل", value: "beginner" },
            { label: "متوسط", value: "intermediate" },
            { label: "صعب", value: "advanced" },
          ].map((item) => (
            <li key={item.value}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked("level", item.value)}
                  onChange={(e) =>
                    handleCheckboxChange("level", item.value, e.target.checked)
                  }
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />

                <span className="text-sm text-muted">{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <Suspense fallback={<div>Loading...</div>}>
        <PriceFilter />
      </Suspense>

      {/* Duration */}
      <div className="py-6">
        <h3 className="mb-4 text-lg font-semibold">المدة</h3>

        <ul className="space-y-3">
          {["0 - 2 ساعة", "3 - 6 ساعات", "6+ ساعات"].map((duration) => (
            <li key={duration}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked("duration", duration)}
                  onChange={(e) =>
                    handleCheckboxChange("duration", duration, e.target.checked)
                  }
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />

                <span className="text-sm text-muted">{duration}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleReset}
        className="mt-2 w-full rounded-xl border border-border py-3 text-sm font-medium transition hover:bg-surface"
      >
        إعادة تعيين
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Filter */}
      <aside className="hidden h-fit w-fit shrink-0 rounded-2xl border border-border bg-white p-6 shadow-sm md:block">
        {filterContent}
      </aside>

      {/* Mobile Filter Button */}
      <div className="w-full md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 font-medium shadow-sm transition hover:bg-surface"
        >
          <SlidersHorizontal className="size-5" />
          <span>الفلاتر</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            aria-label="إغلاق الفلاتر"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer */}
          <aside className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-bold">الفلاتر</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition hover:bg-surface"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">{filterContent}</div>

            {/* Footer */}
            <div className="border-t bg-white p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                عرض النتائج
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AsideFilter;
