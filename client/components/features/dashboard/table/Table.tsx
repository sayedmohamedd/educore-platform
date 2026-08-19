import TableFilter from "./TableFilter";
import TablePagination from "./TablePagination";
import TBody from "./TBody";
import THeader from "./THeader";

const Table = () => {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white border-slate-200 my-4">
      {/* Table filter */}
      <TableFilter />
      <table className="w-full min-w-237.5">
        {/* Table header */}
        <THeader />
        {/* Table body */}
        <TBody />
      </table>
      {/* Table pagination */}
      <TablePagination />
    </div>
  );
};

export default Table;
