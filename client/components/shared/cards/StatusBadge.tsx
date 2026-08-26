// components/cards/StatusBadge.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-colors",
  {
    variants: {
      status: {
        published: "border-emerald-200 bg-emerald-50 text-emerald-700",

        // draft: "border-amber-200 bg-amber-50 text-amber-700",

        // archived: "border-slate-200 bg-slate-100 text-slate-600",
      },
    },

    defaultVariants: {
      status: "published",
    },
  },
);

type Props = VariantProps<typeof badgeVariants> &
  React.HTMLAttributes<HTMLSpanElement>;

export default function StatusBadge({ status, className }: Props) {
  return (
    <span className={cn(badgeVariants({ status }), className)}>{status}</span>
  );
}
