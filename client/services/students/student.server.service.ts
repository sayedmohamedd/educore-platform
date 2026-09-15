/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServer } from "@/lib/apiServer";
import { ResponseDataWithMeta } from "../helpers";
import { Enrollment } from "../courses/types";

export const studentServerService = {
  enrollCourse: (options?: RequestInit) =>
    apiServer<any>(`/enrollments`, options),

  getMyCourses: (options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"enrollments", Enrollment[]>>(
      `/enrollments/me`,
      options,
    ),
};
