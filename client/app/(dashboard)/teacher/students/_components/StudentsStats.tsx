import StatsCard from "@/components/shared/cards/StatsCard";
import { BookOpen, CircleDollarSign, Users } from "lucide-react";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
}

const StudentsStats = ({ students }: { students: Student[] }) => {
  const totalStudents = students.length;

  const totalEnrollments = students.reduce(
    (total, student) => total + student.coursesCount,
    0,
  );

  const stats = [
    {
      title: "Total Students",
      number: totalStudents.toString(),
      percentage: 0,
      Icon: Users,
    },
    {
      title: "Total Enrollments",
      number: totalEnrollments.toString(),
      percentage: 0,
      Icon: BookOpen,
    },
    {
      title: "Total Revenue",
      number: "EGP 0",
      percentage: 0,
      Icon: CircleDollarSign,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default StudentsStats;
