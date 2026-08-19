import Table from "@/components/features/dashboard/table/Table";
import StatsCard from "@/components/shared/cards/StatsCard";
import IconButton from "@/components/ui/IconButton";
import { Download, Users2 } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    number: "11,185",
    percentage: 12.5,
    Icon: Users2,
  },
  {
    title: "Active Teachers",
    number: "564",
    percentage: 17.8,
    Icon: Users2,
  },
  {
    title: "Total Revenue",
    number: "$12,345",
    percentage: 10,
    Icon: Users2,
  },
  {
    title: "Published Courses",
    number: "88",
    percentage: 30,
    Icon: Users2,
  },
];

const Users = () => {
  return (
    <main className="py-4 mb-6 px-8">
      {/* Header */}
      <header className="flex-between mb-4">
        <div>
          <p className="text-muted">
            Admin / <span className="text-primary">Users Management</span>
          </p>
          <p className="paragraph">
            Manage your students, instructors, and system administrators.
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
            text="New User"
            Icon={Users2}
          />
        </div>
      </header>

      {/* Cards */}
      <section className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Table */}
      <Table />
    </main>
  );
};

export default Users;
