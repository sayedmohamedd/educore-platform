import { Column } from "./types";

interface TBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

const TBody = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
}: TBodyProps<T>) => {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-10 text-center text-slate-400"
          >
            جاري التحميل...
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-10 text-center text-slate-400"
          >
            لا توجد بيانات متاحة
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item.id}
          className="border-b border-slate-100 transition hover:bg-slate-50"
        >
          {columns.map((col, colIndex) => (
            <td key={colIndex} className={`px-6 py-5 ${col.className || ""}`}>
              {col.cell
                ? col.cell(item)
                : col.accessorKey
                  ? (item[col.accessorKey] as React.ReactNode)
                  : null}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
