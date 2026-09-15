import TransactionCard from "./TransactionCard";
import { CalendarClock, CircleDollarSign, TrendingUp } from "lucide-react";
const TransactionsStats = () => {
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
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {stats.map((stat) => (
        <TransactionCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default TransactionsStats;
