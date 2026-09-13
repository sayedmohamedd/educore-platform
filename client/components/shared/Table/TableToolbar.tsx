"use client";

import Search from "@/components/ui/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TableFilter, TableSearch } from "./types";

interface TableToolbarProps {
  search?: TableSearch;
  filters?: TableFilter[];
}

const TableToolbar = ({ search, filters = [] }: TableToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";

    if (searchValue === currentSearch) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchValue, searchParams, pathname, router]);

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:flex-wrap sm:items-center">
      {search && (
        <div className="w-full sm:w-72">
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder={search.placeholder}
          />
        </div>
      )}

      {filters.map((filter) => {
        const currentValue =
          searchParams.get(filter.key) ?? filter.options[0]?.value ?? "";

        return (
          <select
            key={filter.key}
            value={currentValue}
            onChange={(event) => updateParam(filter.key, event.target.value)}
            aria-label={filter.label}
            className="h-10 w-full min-w-36 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-slate-400 sm:w-auto"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      })}
    </div>
  );
};

export default TableToolbar;
