import StatsCard from "@/components/shared/cards/StatsCard";
import { User } from "@/services/admin/types";
import { Users2 } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    number: "11,749",
    percentage: 12.5,
    Icon: Users2,
  },
  {
    title: "Students",
    number: "11,185",
    percentage: 12.5,
    Icon: Users2,
  },
  {
    title: "Teachers",
    number: "564",
    percentage: 17.8,
    Icon: Users2,
  },
  {
    title: "Admins",
    number: "3",
    percentage: 0,
    Icon: Users2,
  },
];

const Stats = ({ users }: { users: User[] }) => {
  return (
    <section className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default Stats;
