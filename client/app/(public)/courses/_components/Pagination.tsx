"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";

const pages = [1, 2, 3, "...", 12];

const currentPage:number = 1;
const totalPages:number = 12;

const Pagination = () => {
  return (
    <nav
      aria-label="Pagination"
      className="my-8 flex items-center justify-center gap-3"
    >
      {/* Previous */}
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        className="pagination-item border bg-muted hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>

      {/* Pages */}
      {pages.map((page) =>
        page === "..." ? (
          <span
            key={page}
            className="pagination-item cursor-default bg-transparent"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            aria-current={page === currentPage ? "page" : undefined}
            className={clsx(
              "pagination-item border",
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        className="pagination-item border bg-muted hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;