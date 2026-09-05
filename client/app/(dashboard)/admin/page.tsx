import StatsCard from "@/components/shared/cards/StatsCard";
import RecentActivityItem from "@/components/features/dashboard/RecentActivityItem";
import { CircleDollarSign, Clock3, UserPen, Users } from "lucide-react";
import Link from "next/link";

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
  {
    title: "Total Students",
    number: "11,185",
    percentage: 12.5,
    Icon: Users,
  },
  {
    title: "Pending Payments",
    number: "24",
    percentage: 8.4,
    Icon: Clock3,
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-4">
      {/* Stats */}
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Analytics + Recent Activity */}
      <div className="my-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Revenue Analytics */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:card-up-hover xl:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="section-title">Revenue Analytics</h4>

            <button
              type="button"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              This Month
            </button>
          </div>

          <div className="flex h-100 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <span className="text-muted-foreground">
              Revenue Chart Goes Here
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm xl:col-span-4">
          <div className="flex items-center justify-between">
            <h4 className="section-title">Recent Activity</h4>

            <Link href="#" className="link">
              View All
            </Link>
          </div>

          <ul className="mt-5 divide-y divide-border">
            <RecentActivityItem />
            <RecentActivityItem />
            <RecentActivityItem />
            <RecentActivityItem />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
