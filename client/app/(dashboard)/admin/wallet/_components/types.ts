export enum TransactionType {
  COURSE_EARNING = "COURSE_EARNING",
  PLATFORM_EARNING = "PLATFORM_EARNING",
  REFUND = "REFUND",
  WITHDRAWAL = "WITHDRAWAL",
}

export type PlatformTransaction = {
  id: string;
  walletId: string;
  paymentId: string | null;
  amount: string;
  type: TransactionType;
  createdAt: string;
  platformWalletId: string | null;
  withdrawalId: string | null;
};

export type PlatformWalletData = {
  id: string;
  balance: string;
  updatedAt: string;
  transactions: PlatformTransaction[];
};
