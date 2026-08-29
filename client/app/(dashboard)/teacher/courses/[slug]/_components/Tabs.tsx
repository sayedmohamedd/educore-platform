"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Tab = {
  label: string;
  value: string;
};

const tabs: Tab[] = [
  {
    label: "Courses",
    value: "",
  },
  {
    label: "Active",
    value: "PUBLISHED",
  },
  {
    label: "Archived",
    value: "ARCHIVED",
  },
];

const Tabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "active";

  const handleTabChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    router.push(`/teacher/courses?${params.toString()}`);
  };

  return (
    <ul className="mx-auto my-4 flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-4">
      {tabs.map(({ label, value }) => (
        <li
          key={value}
          onClick={() => handleTabChange(value)}
          className={cn(
            "flex-center flex-1 cursor-pointer gap-2 rounded-sm py-2 font-medium text-slate-700 transition",
            {
              "bg-white text-primary shadow": currentStatus === value,
            },
          )}
        >
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
