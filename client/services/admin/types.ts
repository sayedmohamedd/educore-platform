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

export type ResponseData<K extends string, T> = {
  [P in K]: T;
} & {
  meta?: {
    total?: number;
    page?: number;
    lastPage?: number;
  };
};

export type PaymentData = {
  payments: PaymentRequest[];
  meta?: {
    total?: number;
    page?: number;
    lastPage?: number;
  };
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  avatar: {
    id: string;
    url: string;
  };
};
