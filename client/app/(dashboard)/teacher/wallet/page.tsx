import StatsCard from "@/components/shared/cards/StatsCard";
import { Wallet as WalletIcon } from "lucide-react";
import Withdraw from "./_components/Withdraw";
import Table from "@/components/features/dashboard/table/Table";

const stats = [
  {
    title: "Total Balance",
    number: "$12,450.80",
    Icon: WalletIcon,
    percentage: "+12%",
  },
  {
    title: "Total Balance",
    number: "$12,450.80",
    Icon: WalletIcon,
    percentage: "+12%",
  },
  {
    title: "Total Balance",
    number: "$12,450.80",
    Icon: WalletIcon,
    percentage: "+12%",
  },
];

const Wallet = () => {
  return (
    <main>
      <div className="container p-4">
        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title + index} {...stat} />
          ))}
        </section>

        {/* Withdraw */}
        <Withdraw />

        {/* History */}
        <Table data={[]} columns={[]} showFilter={false} />
      </div>
    </main>
  );
};

export default Wallet;
