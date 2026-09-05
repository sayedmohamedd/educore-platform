"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Column, FilterValues, TableProps } from "./types";

const Table = <T,>({
  data,
  columns,
  filters = [],
  search,
  filterData,
  emptyMessage = "No data found.",
  getRowKey,
  isLoading = false,
}: TableProps<T>) => {
  const [searchValue, setSearchValue] = useState("");

  const [filterValues, setFilterValues] = useState<FilterValues>(() =>
    filters.reduce<FilterValues>((acc, filter) => {
      acc[filter.key] = filter.options[0]?.value || "";
      return acc;
    }, {}),
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = useMemo(() => {
    if (!filterData) {
      return data;
    }

    return data.filter((item) =>
      filterData(item, {
        ...filterValues,
        search: searchValue.trim().toLowerCase(),
      }),
    );
  }, [data, filterData, filterValues, searchValue]);

  const getAlignmentClass = (
    align?: Column<T>["align"],
  ) => {
    switch (align) {
      case "center":
        return "text-center";

      case "right":
        return "text-right";

      default:
        return "text-left";
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Filters */}
      {(filters.length > 0 || search) && (
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search */}
          {search && (
            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(event.target.value)
                }
                placeholder={
                  search.placeholder || "Search..."
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>
          )}

          {/* Dropdown Filters */}
          {filters.map((filter) => (
            <div
              key={filter.key}
              className="w-full sm:w-auto"
            >
              <select
                value={filterValues[filter.key] || ""}
                onChange={(event) =>
                  handleFilterChange(
                    filter.key,
                    event.target.value,
                  )
                }
                aria-label={filter.label}
                className="h-10 w-full min-w-36 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-slate-400 sm:w-auto"
              >
                {filter.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-187.5">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${getAlignmentClass(
                    column.align,
                  )}`}
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
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr
                  key={
                    getRowKey
                      ? getRowKey(item, index)
                      : index
                  }
                  className="border-b border-slate-100 last:border-0"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-5 py-4 ${getAlignmentClass(
                        column.align,
                      )}`}
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

      {/* Footer */}
      <div className="border-t border-slate-200 px-5 py-4">
        <p className="text-sm text-slate-500">
          Showing {filteredData.length} of {data.length}
        </p>
      </div>
    </div>
  );
};

export default Table;