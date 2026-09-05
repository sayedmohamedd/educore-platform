import { apiClient } from "@/lib/apiClient";
import { PaymentRequest, ResponseData } from "./types";
import { Course } from "../courses/types";

export const adminClientService = {
  approvePayment: (paymentId: string, options?: RequestInit) =>
    apiClient<{ payment: PaymentRequest }>(
      `/admin/payments/${paymentId}/approve`,
      {
        ...options,
        method: "PATCH",
      },
    ),

  // Courses

  getAllCourses: async (options?: RequestInit) =>
    apiClient<ResponseData<"courses", Course[]>>(`/admin/courses`, options),
};
