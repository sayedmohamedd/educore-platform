import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Server
export async function apiServer<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  console.log(endpoint);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    credentials: "include",
  });

  console.log("API SERVER STATUS:", res.status);

  const json = await res.json();

  if (!res.ok) {
    console.log("API SERVER ERROR:", json);
    throw new Error(json?.message || "Something went wrong");
  }

  return json.data;
}
