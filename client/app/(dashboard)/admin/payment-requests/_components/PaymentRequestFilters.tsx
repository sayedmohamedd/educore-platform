import { Search } from "lucide-react";

import { PaymentRequestFilter } from "./types";

type Props = {
  search: string;
  filter: PaymentRequestFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: PaymentRequestFilter) => void;
};

const filters: {
  label: string;
  value: PaymentRequestFilter;
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Approved",
    value: "APPROVED",
  },
  {
    label: "Rejected",
    value: "REJECTED",
  },
];

const PaymentRequestFilters = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by student or course..."
          className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentRequestFilters;
