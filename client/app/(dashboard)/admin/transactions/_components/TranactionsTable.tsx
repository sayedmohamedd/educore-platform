"use client";

import TableHeader from "@/components/features/dashboard/table/TableHeader";
import Table from "@/components/features/dashboard/table/Table";

const TransactionsTable = () => {
  return (
    <section className="my-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <TableHeader />

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white"
        >
          All
        </button>

        <button
          type="button"
          className="shrink-0 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Pending
        </button>

        <button
          type="button"
          className="shrink-0 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Completed
        </button>

        <button
          type="button"
          className="shrink-0 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Rejected
        </button>
      </div>

      {/* Table */}
      <Table data={[]} columns={[]} showFilter={false} />
    </section>
  );
};

export default TransactionsTable;
