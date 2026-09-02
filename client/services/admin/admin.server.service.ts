import { PaymentRequestFilter, PaymentData } from "./types";
import { apiServer } from "@/lib/apiServer";

export const adminServerService = {
  getPaymentRequests: async (
    filter: PaymentRequestFilter = "ALL",
    options?: RequestInit,
  ) =>
    apiServer<PaymentData>(
      `/admin/payments?${new URLSearchParams({ filter }).toString()}`,
      options,
    ),
};
