"use client";

import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "./hooks/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = ({ className }: { className?: string }) => {
  const { signout, loading } = useLogout();
  const { user } = useAuthStore();

  if (!user) return null;

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />;
  }

  return (
    <button
      onClick={signout}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
      // className={`cursor-pointer rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark ${className}`}
    >
      <LogOut className="size-4" />
      تسجيل الخروج
    </button>
  );
};

export default LogoutButton;
