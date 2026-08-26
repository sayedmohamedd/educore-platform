"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TableFilter from "./TableFilter";
import TablePagination from "./TablePagination";
import TBody from "./TBody";
import THeader from "./THeader";
import { Column } from "./types"; // أو المكان اللي حطيت فيه الـ Types

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
    <div className="overflow-x-auto rounded-xl border bg-white border-slate-200 my-4">
      {showFilter && <TableFilter />}
      <table className="w-full min-w-237.5">
        <THeader columns={columns} />
        <TBody data={data} columns={columns} isLoading={isLoading} />
      </table>
      <TablePagination meta={meta} />
    </div>
  );
};

export default Table;
