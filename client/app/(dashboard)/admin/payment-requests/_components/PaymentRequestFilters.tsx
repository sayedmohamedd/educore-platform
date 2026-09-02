import { PaymentRequestFilter } from "@/services/admin/types";
import { Search } from "lucide-react";

type Props = {
  search: string;
  filter: PaymentRequestFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: PaymentRequestFilter) => void;
};

const PaymentRequestFilters = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: Props) => {
  const filters: {
    label: string;
    value: PaymentRequestFilter;
  }[] = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search student or course..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const isActive = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary"
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
