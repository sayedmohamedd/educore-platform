import { CalendarDays, Eye, User } from "lucide-react";

import { PaymentRequest } from "./types";
import PaymentRequestStatus from "./PaymentRequestStatus";

type Props = {
  request: PaymentRequest;
  onSelect: (request: PaymentRequest) => void;
};

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString("en-US")} EGP`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PaymentRequestCard = ({ request, onSelect }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">
              {request.student.name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {request.student.email}
            </p>
          </div>
        </div>

        <PaymentRequestStatus status={request.status} />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Course</p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {request.course.title}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {formatCurrency(request.amount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Payment</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {request.paymentMethod.replace("_", " ")}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <div className="mt-1 flex items-center gap-1 text-sm text-slate-600">
              <CalendarDays size={14} />
              {formatDate(request.submittedAt)}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(request)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
      >
        <Eye size={16} />
        View Request
      </button>
    </div>
  );
};

export default PaymentRequestCard;
