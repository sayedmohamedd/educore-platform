const TablePagination = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between p-4">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-slate-700">1</span> to{" "}
        <span className="font-medium text-slate-700">10</span> of{" "}
        <span className="font-medium text-slate-700">126</span> transactions
      </p>

      <div className="flex items-center gap-2">
        <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Previous
        </button>

        <button className="flex size-10 items-center justify-center rounded-lg bg-primary font-medium text-white">
          1
        </button>

        <button className="flex size-10 items-center justify-center rounded-lg border border-slate-200 font-medium text-slate-700 transition hover:bg-slate-100">
          2
        </button>

        <button className="flex size-10 items-center justify-center rounded-lg border border-slate-200 font-medium text-slate-700 transition hover:bg-slate-100">
          3
        </button>

        <span className="px-1 text-slate-400">...</span>

        <button className="flex size-10 items-center justify-center rounded-lg border border-slate-200 font-medium text-slate-700 transition hover:bg-slate-100">
          13
        </button>

        <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
