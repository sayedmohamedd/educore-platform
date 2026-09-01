export type Payment = {
  id: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  rejectionReason: string | null;
  transferReference?: string;
  paymentMethod?: "INSTAPAY" | "WALLET" | "CREDIT_CARD";
  user: {
    id: string;
    name: string;
    email: string;
  };
  course: {
    id: string;
    title: string;
  };
  receiptFile: {
    id: string;
    url: string;
  };
};

export type PaymentRequestFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export type PaymentData = {
  payments: Payment[];
  meta?: {
    total: number;
    page: number;
    lastPage: number;
  };
};
