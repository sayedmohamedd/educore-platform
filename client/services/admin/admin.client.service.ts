import { apiClient } from "@/lib/apiClient";
import { PaymentRequest } from "./types";

export const adminClientService = {
  approvePayment: (paymentId: string, options?: RequestInit) =>
    apiClient<{ payment: PaymentRequest }>(
      `/admin/payments/${paymentId}/approve`,
      {
        ...options,
        method: "PATCH",
      },
    ),
};
