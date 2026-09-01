/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/apiClient";
import { CreatePaymentDto } from "./types";

export const studentClientService = {
  createPayment: (data: CreatePaymentDto, options?: RequestInit) =>
    apiClient<any>(`/payments`, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),
};
