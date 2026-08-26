import { Column } from "./types";

interface THeaderProps<T> {
  columns: Column<T>[];
}

const THeader = <T,>({ columns }: THeaderProps<T>) => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200">
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-6 py-4 text-left text-sm font-semibold text-slate-600 ${col.className || ""}`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THeader;
