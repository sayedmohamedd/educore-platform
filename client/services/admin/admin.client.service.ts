import { apiClient } from "@/lib/apiClient";
import { PaymentRequest, ResponseData } from "./types";
import { Course } from "../courses/types";
import { ResponseDataWithMeta } from "../helpers";

export const adminClientService = {
  approvePayment: (paymentId: string, options?: RequestInit) =>
    apiClient<ResponseData<"payments", PaymentRequest>>(
      `/admin/payments/${paymentId}/approve`,
      {
        ...options,
        method: "PATCH",
      },
    ),

  // Courses

  getAllCourses: async (options?: RequestInit) =>
    apiClient<ResponseDataWithMeta<"courses", Course[]>>(
      `/admin/courses`,
      options,
    ),
};
