/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminCourse } from "@/app/(dashboard)/admin/courses/_components/types";
import {
  PaymentRequest,
  PaymentRequestsFilter,
  Statistics,
  User,
} from "./types";
import { apiServer } from "@/lib/apiServer";
import { ResponseDataWithMeta } from "../helpers";
import { Transaction } from "@/app/(dashboard)/teacher/wallet/_components/types";
import { WalletData } from "@/app/(dashboard)/admin/wallet/_components/types";

export const adminServerService = {
  getPaymentRequests: async (
    filter: PaymentRequestsFilter,
    options?: RequestInit,
  ) =>
    apiServer<ResponseDataWithMeta<"payments", PaymentRequest[]>>(
      `/admin/payments?${new URLSearchParams(
        Object.entries(filter).reduce<Record<string, string>>(
          (params, [key, value]) => {
            if (value !== undefined) params[key] = String(value);
            return params;
          },
          {},
        ),
      ).toString()}`,
      options,
    ),

  getAllUsers: async (options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"users", User[]>>(`/admin/users`, options),

  // Courses
  getAdminCourses: async (query: any, options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"courses", AdminCourse[]>>(
      `/admin/courses?${new URLSearchParams(query).toString()}`,
      options,
    ),

  getStatistics: async (options?: RequestInit) =>
    apiServer<Statistics>(`/admin/statistics`, options),

  getAllTransactions: async (query: any, options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"transactions", Transaction[]>>(
      `/admin/transactions`,
      options,
    ),

  // Platform Wallet & Transcations
  getPlatformWalletAndTransactions: async (query: any, options?: RequestInit) =>
    apiServer<WalletData>(
      `/admin/platform-wallet?${new URLSearchParams(query).toString()}`,
      options,
    ),
};
