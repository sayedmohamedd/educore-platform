import TableHeader from "../../../../../components/features/dashboard/table/TableHeader";
import Table from "../../../../../components/features/dashboard/table/Table";

const TransactionsTable = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm my-4">
      {/* Header */}
      <TableHeader />

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white">
          All
        </button>

        <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Pending
        </button>

        <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Completed
        </button>

        <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Rejected
        </button>
      </div>

      {/* Table */}
      <Table />
    </section>
  );
};

export default TransactionsTable;
