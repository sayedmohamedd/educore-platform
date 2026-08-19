import StatsCard from "@/components/shared/cards/StatsCard";
import Table from "@/components/features/dashboard/table/Table";
import { CircleDollarSign, UserPen } from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total Revenue",
    number: "$12,345",
    percentage: 10,
    Icon: CircleDollarSign,
  },
  {
    title: "Active Teachers",
    number: "564",
    percentage: 17.8,
    Icon: UserPen,
  },
];

const Students = () => {
  return (
    <main>
      <div className="container">
        <Table />
        <div>
          <StatsCard {...stats[0]} />
          <StatsCard {...stats[1]} />
        </div>
      </div>
    </main>
  );
};

export default Students;
