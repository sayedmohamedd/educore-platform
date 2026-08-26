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

  // دالة تغيير الصفحة وتحديث الـ URL
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // لو مفيش غير صفحة واحدة، ممكن نخفي الباجينيشن أو نعرضه هادئ
  if (lastPage <= 1) return null;

  // حساب العناصر المعروضة حالياً (للنص التوضيحي)
  const limit = 10; // أو اللي جاية من الـ meta لو متاح
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between p-4">
      <p className="text-sm text-muted-foreground">
        عرض <span className="font-medium text-slate-700">{startItem}</span> إلى{" "}
        <span className="font-medium text-slate-700">{endItem}</span> من{" "}
        <span className="font-medium text-slate-700">{total}</span> نتيجة
      </p>

      <div className="flex items-center gap-2">
        {/* زر السابق */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          السابق
        </button>

        {/* أرقام الصفحات (هنا بنعرض صفحات بسيطة أو الـ current) */}
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => {
          // ممكن نظهر الصفحات القريبة بس لو عدد الصفحات كبير، بس هنا هنعرضهم بشكل مباشر أو مبسط
          if (
            page === 1 ||
            page === lastPage ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex size-10 items-center justify-center rounded-lg font-medium transition ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-1 text-slate-400">
                ...
              </span>
            );
          }
          return null;
        })}

        {/* زر التالي */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
