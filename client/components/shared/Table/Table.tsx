"use client";

import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";
import TableToolbar from "./TableToolbar";
import { Column, TableProps } from "./types";

const Table = <T,>({
  data,
  columns,
  meta,
  filters = [],
  search,
  isLoading = false,
  emptyMessage = "No data found.",
  getRowKey,
}: TableProps<T>) => {
  const getAlignmentClass = (align?: Column<T>["align"]) => {
    switch (align) {
      case "center":
        return "text-center";

      case "right":
        return "text-right";

      default:
        return "text-left";
    }
  };

  const showToolbar = Boolean(search || filters.length > 0);

  if (isLoading) {
    return <TableSkeleton columns={columns.length} />;
  }

  return (
    <div className="my-4 w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      {showToolbar && <TableToolbar search={search} filters={filters} />}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-187.5">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${getAlignmentClass(
                    column.align,
                  )} ${column.className ?? ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={getRowKey(item)}
                  className="border-b border-slate-100 transition hover:bg-slate-50 last:border-0"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-5 py-4 ${getAlignmentClass(
                        column.align,
                      )} ${column.className ?? ""}`}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && <TablePagination meta={meta} />}
    </div>
  );
};

export default Table;
