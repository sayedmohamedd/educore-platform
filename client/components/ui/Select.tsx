"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectProps {
  sortBy: string; // الحقل اللي هنرتب بناءً عليه (مثلاً 'createdAt' أو 'price')
  defaultOrder?: string; // الاتجاه الافتراضي 'desc' أو 'asc'
  children: React.ReactNode;
}

const Select = ({ sortBy, defaultOrder = "desc", children }: SelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // بنقرا القيم الحالية من الـ URL أو بنحط الافتراضي
  const currentSortBy = searchParams.get("sortBy") || sortBy;
  const currentOrder = searchParams.get("order") || defaultOrder;
  const currentValue = `${currentSortBy}_${currentOrder}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split("_");
    const params = new URLSearchParams(searchParams.toString());

    // بنحدث الـ sortBy و الـ order زي ما الباك إند مستنيهم تماماً
    params.set("sortBy", field);
    params.set("order", order);

    // بنرجع للصفحة الأولى مع كل تغيير في الترتيب
    params.set("page", "1");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-fit">
      <select
        value={currentValue}
        onChange={handleChange}
        className="appearance-none w-full rounded-lg border border-border bg-white py-2 pr-4 pl-10 text-sm outline-none cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />
    </div>
  );
};

export default Select;
