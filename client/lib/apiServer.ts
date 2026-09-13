import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function apiServer<T>(
  endpoint: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> {
  const cookieStore = await cookies();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  // Access token expired
  if (res.status === 401 && !isRetry && endpoint !== "/auth/refresh") {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      return apiServer<T>(endpoint, options, true);
    }
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong");
  }

  return json.data;
}

async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.ok;
}
// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function apiServer<T>(
//   endpoint: string,
//   options?: RequestInit,
//   isRetry = false,
// ): Promise<T> {
//   const cookieStore = await cookies();

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       ...options?.headers,
//       "Content-Type": "application/json",
//       Cookie: cookieStore.toString(),
//     },
//     credentials: "include",
//   });

//   // Access token expired
//   if (res.status === 401 && !isRetry && endpoint !== "/auth/refresh") {
//     const refreshed = await refreshAccessToken();

//     if (refreshed) {
//       return apiServer<T>(endpoint, options, true);
//     }
//   }

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json?.message || "Something went wrong");
//   }

//   return json.data;
// }

// async function refreshAccessToken(): Promise<boolean> {
//   const cookieStore = await cookies();

//   const res = await fetch(`${BASE_URL}/auth/refresh`, {
//     method: "POST",
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//     credentials: "include",
//   });

//   return res.ok;
// }
