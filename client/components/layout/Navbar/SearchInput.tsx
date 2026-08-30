"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const SearchInput = ({
  className,
  endpoint,
}: {
  className?: string;
  endpoint?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Search يلغي Category
    params.delete("category");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`/${endpoint}?${params.toString()}`);
    });
  };

  // const handleSearch = (term: string) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (term) {
  //     params.set("search", term);
  //   } else {
  //     params.delete("search");
  //   }

  //   // نرجع لصفحة 1 مع البحث الجديد
  //   params.set("page", "1");

  //   startTransition(() => {
  //     // لو اليوزر مش في صفحة الكورسات، ممكن توجيهه ليها، أو تحديث الـ URL لو هو فيها
  //     router.push(`/${endpoint}?${params.toString()}`);
  //   });
  // };

  return (
    <div
      className={`flex items-center gap-2 bg-surface px-4 py-2 rounded-xl border border-border ${className}`}
    >
      <Search className="w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="ابحث عن كورس..."
        // defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-transparent text-sm font-semibold outline-none w-full"
      />
      {isPending && <span className="text-xs text-muted-foreground"></span>}
    </div>
  );
};

export default SearchInput;
