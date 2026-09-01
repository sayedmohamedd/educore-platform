import { CalendarDays, Eye, User } from "lucide-react";

import { PaymentRequest } from "./types";
import PaymentRequestStatus from "./PaymentRequestStatus";

type Props = {
  requests: PaymentRequest[];
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

const PaymentRequestsTable = ({ requests, onSelect }: Props) => {
  if (!requests.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          No payment requests found.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="border-b border-slate-200 bg-slate-50/70">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id} className="transition hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <User size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {request.student.name}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {request.student.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="max-w-60 px-6 py-4">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {request.course.title}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-700">
                    {formatCurrency(request.amount)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {request.paymentMethod.replace("_", " ")}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {request.transferReference}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays size={15} />
                    {formatDate(request.submittedAt)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <PaymentRequestStatus status={request.status} />
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onSelect(request)}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRequestsTable;
