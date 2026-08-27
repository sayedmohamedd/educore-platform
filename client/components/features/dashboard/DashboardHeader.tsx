"use client";

import { Menu } from "lucide-react";

const DashboardHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary md:hidden"
          aria-label="Open dashboard menu"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        {/* Notifications */}
        {/* User Menu */}
      </div>
    </header>
  );
};

export default DashboardHeader;
// const DashboardHeader = () => {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
//       <h1 className="text-2xl font-bold text-foreground">
//         Dashboard
//       </h1>

//       <div className="flex items-center gap-4">
//         {/* Search */}
//         {/* Notifications */}
//         {/* User Menu */}
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;
