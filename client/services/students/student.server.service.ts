/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServer } from "@/lib/apiServer";

export const studentServerService = {
  enrollCourse: (options?: RequestInit) =>
    apiServer<any>(`/enrollments}`, options),

  myCourses: (options?: RequestInit) =>
    apiServer<any>(`/enrollments/me}`, options),
};
