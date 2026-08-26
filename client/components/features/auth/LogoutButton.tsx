"use client";

import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "./hooks/useLogout";

const LogoutButton = () => {
  const { signout, loading } = useLogout();
  const { user } = useAuthStore();

  if (!user) return null;

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />;
  }

  return (
    <button
      onClick={signout}
      className="cursor-pointer rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
