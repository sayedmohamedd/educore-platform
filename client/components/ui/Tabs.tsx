"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const Tabs = ({ tabs }: { tabs: string[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <nav className="border-b border-slate-200">
      <ul className="flex items-center gap-4 overflow-x-auto px-4 sm:gap-6 sm:px-6">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap border-b-2 px-2 py-3 text-sm font-medium transition-colors focus:outline-none",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-slate-700",
              )}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
// "use client";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// const Tabs = ({ tabs }: { tabs: string[] }) => {
//   const [activeTab, setActiveTab] = useState<string>(tabs[0]);
//   return (
//     <nav>
//       <ul className="flex `items-center gap-6 font-medium border-b border-gray-200 px-4">
//         {tabs.map((tab) => (
//           <li
//             key={tab}
//             className={cn(
//               "cursor-pointer border-b-2 px-2 py-3 focus:outline-none",
//               activeTab === tab
//                 ? "border-primary text-primary"
//                 : "border-transparent text-muted",
//             )}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Tabs;
