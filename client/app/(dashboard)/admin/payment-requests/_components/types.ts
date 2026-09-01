export type PaymentRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type PaymentMethod = "INSTAPAY" | "BANK_TRANSFER" | "WALLET";

export type PaymentRequest = {
  id: string;

  student: {
    id: string;
    name: string;
    email: string;
  };

  course: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };

  amount: number;
  currency: "EGP";

  paymentMethod: PaymentMethod;
  transferReference: string;
  transferDate: string;
  submittedAt: string;

  receiptUrl: string;
  note?: string;

  status: PaymentRequestStatus;
  rejectionReason?: string;
};

export type PaymentRequestFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";
