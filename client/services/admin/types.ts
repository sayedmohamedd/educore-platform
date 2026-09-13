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
} & { meta?: Meta };

export type Meta = {
  total?: number;
  page?: number;
  limit?: number;
  lastPage?: number;
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

export type Statistics = {
  revenue: number;
  teachers: number;
  students: number;
  pendingPayments: number;
};

export type PaymentRequestsFilter = {
  page?: number;
  limit?: number;
  search?: string;
  status?: PaymentRequestStatus;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  payment: {
    status: TransactionStatus;
  };
  receiptFile?: {
    id: string;
    url: string;
  };
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };

  course: {
    id: string;
    title: string;
  };
};

type TransactionType =
  | "COURSE_EARNING"
  | "PLATFORM_EARNING"
  | "REFUND"
  | "WITHDRAWAL";
type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";
