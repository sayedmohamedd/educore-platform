/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCard from "@/components/shared/cards/StatsCard";
import { BookOpen, CircleDollarSign, GraduationCap, Users } from "lucide-react";

const TeacherStats = ({ statistics }: { statistics: any }) => {
  const stats = [
    {
      title: "Total Courses",
      number: statistics?.courses?.length || 0,
      percentage: 8.5,
      Icon: BookOpen,
    },
    {
      title: "Total Students",
      number: statistics?.students || 0,
      percentage: 14.2,
      Icon: Users,
    },
    {
      title: "Published Courses",
      number: statistics?.publishedCourses || 0,
      percentage: 6.4,
      Icon: GraduationCap,
    },
    {
      title: "Total Earnings",
      number: `${statistics?.totalRevenue || 0} EGP`,
      percentage: 18.7,
      Icon: CircleDollarSign,
    },
  ];
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default TeacherStats;
