import TransactionsTable from "@/app/(dashboard)/admin/transactions/_components/TranactionsTable";
import {
  CalendarClock,
  CircleDollarSign,
  Download,
  TrendingUp,
} from "lucide-react";
import TransactionCard from "./_components/TransactionCard";
import IconButton from "@/components/ui/IconButton";

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
    IconBgClass: "bg-white/10",
    IconClassName: "text-white",
    title: "Net Revenue",
    number: "$124,200.00",
    paragraph: "Performance: Excellent",
    paragraphClassName: "text-white/70",
    cardBgClass: "bg-primary text-white",
  },
];

const Transactions = () => {
  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Transactions</h2>

          <p className="paragraph">
            Manage and review your financial activities across Lumina.
          </p>
        </div>

        <IconButton
          className="w-fit bg-white text-slate-700 hover:bg-slate-50"
          text="Export Report"
          Icon={Download}
        />
      </header>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {stats.map((stat) => (
          <TransactionCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Transactions */}
      <TransactionsTable />
    </main>
  );
};

export default Transactions;
