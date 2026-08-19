import axios from "axios";

export const api = axios.create({
  // baseURL: "https://api.escuelajs.co/api/v1",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
