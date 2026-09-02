import { CheckCircle2, Clock3, RotateCcw, XCircle } from "lucide-react";

import { PaymentRequestStatus as Status } from "@/services/admin/types";

type Props = {
  status: Status;
};

const PaymentRequestStatus = ({ status }: Props) => {
  const config = {
    PENDING: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700",
      icon: Clock3,
    },

    APPROVED: {
      label: "Approved",
      className: "bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    },

    REJECTED: {
      label: "Rejected",
      className: "bg-red-50 text-red-700",
      icon: XCircle,
    },

    REFUNDED: {
      label: "Refunded",
      className: "bg-slate-100 text-slate-700",
      icon: RotateCcw,
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${current.className}`}
    >
      <Icon size={14} />
      {current.label}
    </span>
  );
};

export default PaymentRequestStatus;
