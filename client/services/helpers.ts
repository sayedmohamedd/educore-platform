export const handleResponse = async <T>(res: Response): Promise<T> => {
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Request failed");
  }

  return json.data;
};

export type ResponseData<K extends string, T> = {
  [P in K]: T;
};

export type ResponseDataWithMeta<K extends string, T> = ResponseData<K, T> & {
  meta: Meta;
};

export type Meta = {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
};
