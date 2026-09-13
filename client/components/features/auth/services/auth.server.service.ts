/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiServer } from "@/lib/apiServer";

export const authServerService = {
  refresh: (options?: RequestInit) =>
    apiServer<{ user: any }>(`/auth/refresh`, options),
};
