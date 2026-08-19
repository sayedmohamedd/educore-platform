"use client";
import { Tab } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label
    
  );
  return (
    <ul className="flex items-center gap-2 bg-gray-100 py-4 px-6 mx-auto my-4 rounded-lg">
      {tabs.map(({ label, Icon }) => (
        <li
          key={label}
          onClick={() => setActiveTab(label)}
          className={cn(
            "flex-center flex-1 gap-2 rounded-sm py-2 font-medium text-slate-700 transition cursor-pointer",
            {
              "bg-white text-primary shadow": activeTab === label,
            },
          )}
        >
          {Icon && <Icon />}
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
