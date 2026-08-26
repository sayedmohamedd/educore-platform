import TransactionsTable from "@/app/(dashboard)/admin/transactions/_components/TranactionsTable";
import {
  CalendarClock,
  CircleDollarSign,
  Download,
  Plus,
  TrendingUp,
} from "lucide-react";
import TransactionCard from "./_components/TransactionCard";
import IconButton from "@/components/ui/IconButton";
import { Suspense } from "react";

const stats = [
  {
    badgeContent: "+12.5%",
    badgeClassName: "text-green-600 bg-green-100",
    Icon: CircleDollarSign,
    title: "Total Volume",
    number: "$142,850.00",
    paragraph: "Last updated: 2 hours ago",
  },
  {
    badgeContent: "8 pending",
    badgeClassName: "text-amber-600 bg-amber-100",
    Icon: CalendarClock,
    title: "Pending Withdrawals",
    number: "$12,430.25",
    paragraph: "Average processing: 24h",
  },
  {
    Icon: TrendingUp,
    IconBgClass: "bg-primary/10",
    title: "Net Revenue",
    number: "$124,200.00",
    paragraph: "Performance: Excellent",
    cardBgClass: "bg-primary text-white",
  },
];

const Transactions = () => {
  return (
    <main className="py-4 px-8">
      <header className="flex-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Transactions</h2>
          <p className="paragraph">
            Manage and review your financial activities across Lumina.
          </p>
        </div>
        <div className="flex-center gap-4">
          <IconButton
            className={"bg-white text-slate-700 hover:bg-slate-50"}
            text="Export Report"
            Icon={Download}
          />
          <IconButton
            className={"bg-primary text-white hover:bg-secondary"}
            text="New Request"
            Icon={Plus}
          />
        </div>
      </header>
      {/*  */}
      <section className="mt-8 grid gap-18 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <TransactionCard key={stat.title} {...stat} />
        ))}
      </section>
      <Suspense fallback={<div>Loading transactions...</div>}>
        <TransactionsTable />
      </Suspense>
    </main>
  );
};

export default Transactions;
