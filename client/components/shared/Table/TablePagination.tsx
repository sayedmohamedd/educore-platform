"use client";

import { Meta } from "@/services/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = ({ meta }: { meta: Meta }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, limit, total, lastPage } = meta;

  if (total === 0 || lastPage <= 1) {
    return null;
  }

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage || newPage === page) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const pages: (number | "ellipsis")[] = [];

  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(lastPage - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < lastPage - 2) {
      pages.push("ellipsis");
    }

    pages.push(lastPage);
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-slate-500 sm:text-left">
        Showing <span className="font-medium text-slate-700">{startItem}</span>{" "}
        to <span className="font-medium text-slate-700">{endItem}</span> of{" "}
        <span className="font-medium text-slate-700">{total}</span> results
      </p>

      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {pages.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-slate-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={item}
              type="button"
              onClick={() => handlePageChange(item)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition sm:size-10 ${
                page === item
                  ? "bg-primary text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === lastPage}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
