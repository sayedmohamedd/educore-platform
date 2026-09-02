export type PaymentRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "REFUNDED";

export type PaymentRequest = {
  id: string;
  amount: string;
  status: PaymentRequestStatus;
  createdAt: string;
  updatedAt?: string;
  paymentMethod?: string;
  rejectionReason: string | null;
  note: string | null;
  course: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  receiptFile: {
    id: string;
    url: string;
  };
};

export type PaymentRequestFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export type PaymentData = {
  payments: PaymentRequest[];
  meta?: {
    total?: number;
    page?: number;
    lastPage?: number;
  };
};

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt: string;
//   rejectionReason: string | null;
//   transferReference?: string;
//   paymentMethod?: "INSTAPAY" | "WALLET" | "CREDIT_CARD";
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   course: {
//     id: string;
//     title: string;
//   };
//   receiptFile: {
//     id: string;
//     url: string;
//   };
// };

// export type PaymentRequestFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";
