import { Download } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import TransactionsTable from "./_components/TranactionsTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/shared/Table/TableSkeleton";
import TransactionsStats from "./_components/TransactionsStats";
import StatsSkeleton from "../_components/StatsSkeleton";

const Transactions = () => {
  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Transactions</h2>

          <p className="paragraph">
            Manage and review your financial activities across EduCore.
          </p>
        </div>

        <IconButton
          className="w-fit bg-white text-slate-700 hover:bg-slate-50"
          text="Export Report"
          Icon={Download}
        />
      </header>

      <Suspense fallback={<StatsSkeleton />}>
        <TransactionsStats />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <TransactionsTable />
      </Suspense>
    </main>
  );
};

export default Transactions;
