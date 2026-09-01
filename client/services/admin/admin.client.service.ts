import { apiClient } from "@/lib/apiClient";
import { PaymentRequestFilter, PaymentData } from "./types";

export const adminClientService = {
  getPaymentRequests: async (
    filter: PaymentRequestFilter,
    options?: RequestInit,
  ) =>
    apiClient<PaymentData>(
      `/admin/payments?${new URLSearchParams({ filter }).toString()}`,
      options,
    ),
};
