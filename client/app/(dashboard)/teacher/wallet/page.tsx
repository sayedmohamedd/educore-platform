import { Clock3, DollarSign, Wallet as WalletIcon } from "lucide-react";

import StatsCard from "@/components/shared/cards/StatsCard";

import Withdraw from "./_components/Withdraw";
import { Transaction } from "./_components/types";
import TransactionHistory from "./_components/TransactionHistory";
import { Suspense } from "react";

const stats = [
  {
    title: "Available Balance",
    number: "$8,450.80",
    Icon: WalletIcon,
    percentage: "+12%",
  },
  {
    title: "Pending Balance",
    number: "$2,000.00",
    Icon: Clock3,
    percentage: "+5%",
  },
  {
    title: "Total Earnings",
    number: "$12,450.80",
    Icon: DollarSign,
    percentage: "+12%",
  },
];

const transactions: Transaction[] = [
  {
    id: "1",
    type: "Course Sale",
    amount: 50,
    status: "Completed",
    createdAt: "Sep 6, 2026",
  },
  {
    id: "2",
    type: "Withdrawal",
    amount: 100,
    status: "Pending",
    createdAt: "Sep 5, 2026",
  },
  {
    id: "3",
    type: "Course Sale",
    amount: 75,
    status: "Completed",
    createdAt: "Sep 4, 2026",
  },
  {
    id: "4",
    type: "Refund",
    amount: 40,
    status: "Completed",
    createdAt: "Sep 3, 2026",
  },
];

const Wallet = () => {
  return (
    <main>
      <div className="container p-4">
        {/* Stats */}
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </section>

        {/* Withdraw */}
        <Withdraw />

        {/* Transaction History */}
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionHistory transactions={transactions} />
        </Suspense>
      </div>
    </main>
  );
};

export default Wallet;
