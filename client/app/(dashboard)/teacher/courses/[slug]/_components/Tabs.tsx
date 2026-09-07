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

  const currentStatus = searchParams.get("status") ?? "";

  const handleTabChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!status) {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    const query = params.toString();

    router.push(`/teacher/courses${query ? `?${query}` : ""}`);
  };

  return (
    <div className="my-6 border-b border-slate-200">
      <nav className="flex items-center gap-6">
        {tabs.map(({ label, value }) => {
          const isActive = currentStatus === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleTabChange(value)}
              className={cn(
                "relative pb-3 text-sm font-medium text-slate-500 transition-colors",
                "hover:text-slate-700",
                isActive && "text-primary",
              )}
            >
              {label}

              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
