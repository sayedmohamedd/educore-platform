"use client";

import { Meta } from "@/services/courses/types";
import { useRouter, useSearchParams } from "next/navigation";

interface TablePaginationProps {
  meta?: Meta;
}

const TablePagination = ({ meta }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = meta?.page || 1;
  const lastPage = meta?.lastPage || 1;
  const total = meta?.total || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // if (lastPage <= 1) return null;

  const limit = 10;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 p-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-muted-foreground sm:text-start">
        عرض <span className="font-medium text-slate-700">{startItem}</span> إلى{" "}
        <span className="font-medium text-slate-700">{endItem}</span> من{" "}
        <span className="font-medium text-slate-700">{total}</span> نتيجة
      </p>

      <div className="flex items-center justify-center gap-2">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          السابق
        </button>

        {/* Pages */}
        <div className="flex items-center gap-1">
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === lastPage ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition sm:size-10 ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              );
            }

            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-0.5 text-sm text-slate-400">
                  ...
                </span>
              );
            }

            return null;
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
