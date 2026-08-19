import Search from "@/components/ui/Search";
import { CalendarDays, Download } from "lucide-react";

const TableFilter = () => {
  return (
    <div className="my-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between bg-white shadow p-6 rounded-xl">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}
        <Search />

        {/* Status */}
        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary">
          <option>All Status</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>

        {/* Role */}
        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary">
          <option>All Roles</option>
          <option>Student</option>
          <option>Teacher</option>
        </select>

        {/* Date */}
        <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm text-slate-600 transition hover:bg-slate-50">
          <CalendarDays className="size-4" />
          Date
        </button>
      </div>

      {/* Export */}
      <button className="btn gap-2 border bg-white text-slate-700 hover:bg-slate-50">
        <Download className="size-4" />
        <span>Export Report</span>
      </button>
    </div>
  );
};

export default TableFilter;
