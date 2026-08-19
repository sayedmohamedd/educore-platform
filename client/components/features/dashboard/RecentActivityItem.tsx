import { User } from "lucide-react";

const RecentActivityItem = () => {
  return (
    <li className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 transition-colors cursor-pointer hover:opacity-90 duration-75">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <User className="text-primary" size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <h6 className="text-sm font-semibold text-foreground hover:text-primary">
          New teacher application
        </h6>

        <p className="mt-1 text-sm text-muted-foreground">
          Dr. Sarah Jenkins applied for Mathematics.
        </p>

        <span className="mt-2 block text-xs text-muted">
          2 minutes ago
        </span>
      </div>
    </li>
  );
};

export default RecentActivityItem;