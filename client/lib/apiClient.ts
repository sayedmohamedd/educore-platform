// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Client
// export async function apiClient<T>(
//   endpoint: string,
//   options?: RequestInit,
// ): Promise<T> {
//   const res = await fetch(`/api/v1${endpoint}`, {
//     ...options,
//     headers: {
//       ...options?.headers,
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json?.message || "Something went wrong");
//   }

//   return json.data;
// }

// Client

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    return res.ok;
  } catch {
    return false;
  }
};

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> {
  const res = await fetch(`/api/v1${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Access token expired
  if (res.status === 401 && !isRetry && endpoint !== "/auth/refresh") {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      // Retry the original request with the new access token
      return apiClient<T>(endpoint, options, true);
    }
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong");
  }

  return json.data;
}
