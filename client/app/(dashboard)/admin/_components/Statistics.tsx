import {
  CircleDollarSign,
  Clock3,
  LucideIcon,
  UserPen,
  Users,
} from "lucide-react";
import { Suspense } from "react";

import StatsCard from "../courses/_components/StatsCard";

import { adminServerService } from "@/services/admin/admin.server.service";
import type { Statistics as Stats } from "@/services/admin/types";
import StatsSkeleton from "./StatsSkeleton";

type StatsData = {
  title: string;
  number: number;
  Icon: LucideIcon;
  iconStyle: string;
};

const StatisticsContent = async () => {
  let stats: Stats = {} as Stats;

  try {
    stats = await adminServerService.getStatistics({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
  }

  const statsData: StatsData[] = [
    {
      title: "Total Revenue",
      number: stats.revenue,
      Icon: CircleDollarSign,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Teachers",
      number: stats.teachers,
      Icon: UserPen,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Students",
      number: stats.students,
      Icon: Users,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Payments",
      number: stats.pendingPayments,
      Icon: Clock3,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.title}
          Icon={stat.Icon}
          number={stat.number}
          title={stat.title}
          iconStyle={stat.iconStyle}
        />
      ))}
    </div>
  );
};

const Statistics = () => {
  return (
    <Suspense fallback={<StatsSkeleton />}>
      <StatisticsContent />
    </Suspense>
  );
};

export default Statistics;
