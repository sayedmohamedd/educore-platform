// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Client
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api/v1${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong");
  }

  return json.data;
}
