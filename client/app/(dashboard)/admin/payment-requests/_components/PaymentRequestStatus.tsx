import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { PaymentRequestStatus as Status } from "./types";

type Props = {
  status: Status;
};

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const PaymentRequestStatus = ({ status }: Props) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
};

export default PaymentRequestStatus;
