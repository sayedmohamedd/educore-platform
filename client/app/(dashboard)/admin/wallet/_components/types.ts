import { Meta } from "@/services/helpers";

export interface WalletTransactionPayment {
  id: string;
  amount: string;
  status: "APPROVED";
}

export interface WalletTransaction {
  id: string;
  amount: string;
  type: TransactionType;
  createdAt: string;
  payment: WalletTransactionPayment;
  withdrawalId: string | null;
}

export interface Wallet {
  id: string;
  balance: string;
}

export interface WalletStats {
  totalEarnings: number;
  totalRefunds: number;
  totalWithdrawals: number;
}

export interface WalletData {
  wallet: Wallet;
  transactions: WalletTransaction[];
  stats: WalletStats;
  meta: Meta;
}

export enum TransactionType {
  COURSE_EARNING = "COURSE_EARNING",
  PLATFORM_EARNING = "PLATFORM_EARNING",
  REFUND = "REFUND",
  WITHDRAWAL = "WITHDRAWAL",
}

// export type PlatformTransaction = {
//   id: string;
//   walletId: string;
//   paymentId: string | null;
//   amount: string;
//   type: TransactionType;
//   createdAt: string;
//   platformWalletId: string | null;
//   withdrawalId: string | null;
// };

// export type PlatformWalletData = {
//   id: string;
//   balance: string;
//   updatedAt: string;
//   transactions: PlatformTransaction[];
// };
