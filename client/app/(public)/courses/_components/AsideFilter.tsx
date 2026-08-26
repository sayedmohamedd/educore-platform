"use client";

import { Meta } from "@/services/courses/types";
import PriceFilter from "./filters/PriceFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

const AsideFilter = ({ meta }: { meta: Meta }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // دالة مساعدة لتحديث الـ Query Params في الـ URL
  const createQueryString = useCallback(
    (name: string, value: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      // هنا بنجيب القيم القديمة لو موجودة (عشان الـ checkboxes المتعددة)
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

      // بنرجع للـ page 1 أول ما الفلتر يتغير عشان النتائج تبدأ من الأول
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

  // دالة مساعدة تشوف هل الـ Checkbox متحدد ولا لا من الـ URL الحالي
  const isChecked = (name: string, value: string) => {
    const current = searchParams.get(name);
    if (!current) return false;
    return current.split(",").includes(value);
  };

  return (
    <aside className="h-fit w-full md:w-fit rounded-2xl border border-border bg-white p-6 shadow-sm">
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
    </aside>
  );
};

export default AsideFilter;
