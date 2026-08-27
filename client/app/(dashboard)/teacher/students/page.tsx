"use client";

import StatsCard from "@/components/shared/cards/StatsCard";
import Table from "@/components/features/dashboard/table/Table";
import { BookOpen, CircleDollarSign, UserCheck, Users } from "lucide-react";
import { Column } from "@/components/features/dashboard/table/types";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
  status: "Active" | "Inactive";
}

const Students = () => {
  // Mock Data
  const students: Student[] = [
    {
      id: "1",
      fullName: "Ahmed Mohamed",
      email: "ahmed@mail.com",
      enrolledAt: "2026-08-01",
      coursesCount: 3,
      status: "Active",
    },
    {
      id: "2",
      fullName: "Mohamed Ali",
      email: "mohamed@mail.com",
      enrolledAt: "2026-08-05",
      coursesCount: 2,
      status: "Active",
    },
    {
      id: "3",
      fullName: "Omar Hassan",
      email: "omar@mail.com",
      enrolledAt: "2026-08-12",
      coursesCount: 1,
      status: "Active",
    },
    {
      id: "4",
      fullName: "Youssef Ahmed",
      email: "youssef@mail.com",
      enrolledAt: "2026-08-15",
      coursesCount: 4,
      status: "Inactive",
    },
  ];

  // Mock Stats
  const stats = [
    {
      title: "Total Students",
      number: "1,245",
      percentage: 12.5,
      Icon: Users,
    },
    {
      title: "Active Students",
      number: "1,120",
      percentage: 8.4,
      Icon: UserCheck,
    },
    {
      title: "Total Enrollments",
      number: "2,845",
      percentage: 15.2,
      Icon: BookOpen,
    },
    {
      title: "Total Revenue",
      number: "EGP 124,500",
      percentage: 10.8,
      Icon: CircleDollarSign,
    },
  ];

  // Table Columns
  const studentColumns: Column<Student>[] = [
    {
      header: "Student",
      accessorKey: "fullName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Courses",
      accessorKey: "coursesCount",
    },
    {
      header: "Enrolled At",
      accessorKey: "enrolledAt",
    },
    {
      header: "Status",
      cell: (student) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {student.status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (student) => (
        <button
          onClick={() => console.log(student.id)}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Profile
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Students</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and monitor students enrolled in your courses.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Students Table */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Table Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">My Students</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Students currently enrolled in your courses.
          </p>
        </div>

        {/* Table */}
        <Table data={students} columns={studentColumns} showFilter={false} />
      </section>
    </main>
  );
};

export default Students;

// "use client";

// import StatsCard from "@/components/shared/cards/StatsCard";
// import Table from "@/components/features/dashboard/table/Table";
// import { CircleDollarSign, UserPen } from "lucide-react";
// import { Column } from "@/components/features/dashboard/table/types";
// import { Suspense } from "react";

// const stats = [
//   {
//     title: "Total Revenue",
//     number: "$12,345",
//     percentage: 10,
//     Icon: CircleDollarSign,
//   },
//   {
//     title: "Active Teachers",
//     number: "564",
//     percentage: 17.8,
//     Icon: UserPen,
//   },
// ];

// interface Student {
//   id: string;
//   fullName: string;
//   email: string;
//   enrolledAt: string;
//   status: string;
// }

// const Students = () => {
//   const students: Student[] = [
//     {
//       id: "1",
//       fullName: "أحمد محمد",
//       email: "ahmed@mail.com",
//       enrolledAt: "2026-08-01",
//       status: "Active",
//     },
//   ];

//   const studentColumns: Column<Student>[] = [
//     { header: "اسم الطالب", accessorKey: "fullName" },
//     { header: "البريد الإلكتروني", accessorKey: "email" },
//     { header: "تاريخ التسجيل", accessorKey: "enrolledAt" },
//     {
//       header: "الحالة",
//       cell: (student) => (
//         <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
//           {student.status}
//         </span>
//       ),
//     },
//     {
//       header: "الإجراءات",
//       cell: (student) => (
//         <button
//           onClick={() => console.log(student.id)}
//           className="text-primary hover:underline"
//         >
//           عرض الملف
//         </button>
//       ),
//       className: "text-right",
//     },
//   ];

//   return (
//     <main>
//       <div className="container">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatsCard {...stats[0]} />
//           <StatsCard {...stats[1]} />
//           <StatsCard {...stats[1]} />
//           <StatsCard {...stats[1]} />
//         </div>
//         <Table data={students} columns={studentColumns} showFilter={false} />
//       </div>
//     </main>
//   );
// };

// export default Students;
