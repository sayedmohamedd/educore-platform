/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";

import TableFilter from "./TableFilter";
import TablePagination from "./TablePagination";
import TBody from "./TBody";
import THeader from "./THeader";
import { Column } from "./types";

interface TableComponentProps<T> {
  data: T[];
  columns: Column<T>[];
  meta?: any;
  isLoading?: boolean;
  showFilter?: boolean;
}

const Table = <T extends { id: string | number }>({
  data,
  columns,
  meta,
  isLoading,
  showFilter = true,
}: TableComponentProps<T>) => {
  return (
    <div className="my-4 w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      {showFilter && <TableFilter />}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-162.5 sm:min-w-187.5 lg:min-w-0">
          <THeader columns={columns} />

          <TBody data={data} columns={columns} isLoading={isLoading} />
        </table>
      </div>

      <Suspense fallback={null}>
        <TablePagination meta={meta} />
      </Suspense>
    </div>
  );
};

export default Table;
