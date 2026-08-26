"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // القيمة الحالية مباشرة من الـ URL (لو مش موجودة تبقى 500)
  const currentPrice = searchParams.get("maxPrice") || "500";

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", newPrice);
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="border-b border-border py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">السعر</h3>
        {isPending && <span className="text-xs text-muted-foreground"></span>}
      </div>

      <input
        type="range"
        min={0}
        max={2000}
        value={currentPrice}
        onChange={handlePriceChange}
        className="w-full accent-primary cursor-pointer"
      />

      <div className="mt-3 flex justify-between text-sm text-muted">
        <span>مجاني</span>
        <span className="font-medium text-slate-700">{currentPrice} ج.م</span>
      </div>
    </div>
  );
};

export default PriceFilter;
