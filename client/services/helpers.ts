


export const handleResponse = async <T>(res: Response): Promise<T> => {
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Request failed");
  }

  return json.data;
};
