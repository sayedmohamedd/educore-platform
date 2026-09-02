import { PaymentRequest } from "@/services/admin/types";
import PaymentRequestStatus from "./PaymentRequestStatus";

type Props = {
  request: PaymentRequest;
  onSelect: (request: PaymentRequest) => void;
};

const PaymentRequestCard = ({ request, onSelect }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-semibold text-slate-700">
            {request.user.fullName}
          </p>

          <p className="mt-1 truncate text-sm text-muted-foreground">
            {request.user.email}
          </p>
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

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {Number(request.amount)} EGP
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">Date</p>

            <p className="mt-1 text-sm text-slate-600">
              {new Date(request.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onSelect(request)}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          View Request
        </button>
      </div>
    </div>
  );
};

export default PaymentRequestCard;
