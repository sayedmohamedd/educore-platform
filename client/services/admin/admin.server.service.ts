import { AdminCourse } from "@/app/(dashboard)/admin/courses/_components/typs";
import { PaymentRequestFilter, PaymentData, ResponseData, User } from "./types";
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

  getAllUsers: async (options?: RequestInit) =>
    apiServer<ResponseData<"users", User[]>>(`/admin/users`, options),

  getAdminCourses: async (options?: RequestInit) =>
    apiServer<ResponseData<"courses", AdminCourse[]>>(
      `/admin/courses`,
      options,
    ),
};
