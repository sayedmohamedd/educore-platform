"use client";

import StatsCard from "@/components/shared/cards/StatsCard";
import Table from "@/components/features/dashboard/table/Table";
import { CircleDollarSign, UserPen } from "lucide-react";
import { Column } from "@/components/features/dashboard/table/types";
import { Suspense } from "react";

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

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  status: string;
}

const Students = () => {
  const students: Student[] = [
    {
      id: "1",
      fullName: "أحمد محمد",
      email: "ahmed@mail.com",
      enrolledAt: "2026-08-01",
      status: "Active",
    },
  ];

  const studentColumns: Column<Student>[] = [
    { header: "اسم الطالب", accessorKey: "fullName" },
    { header: "البريد الإلكتروني", accessorKey: "email" },
    { header: "تاريخ التسجيل", accessorKey: "enrolledAt" },
    {
      header: "الحالة",
      cell: (student) => (
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
          {student.status}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      cell: (student) => (
        <button
          onClick={() => console.log(student.id)}
          className="text-primary hover:underline"
        >
          عرض الملف
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <main>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard {...stats[0]} />
          <StatsCard {...stats[1]} />
          <StatsCard {...stats[1]} />
          <StatsCard {...stats[1]} />
        </div>
        <Table data={students} columns={studentColumns} showFilter={false} />
      </div>
    </main>
  );
};

export default Students;
