"use client";

import { User } from "lucide-react";
import { Role, useAuthStore } from "@/store/auth.store";

const UserBadge = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <User size={20} />
      </div>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold text-foreground">{user.fullName}</p>

        <p className="text-xs text-muted-foreground">
          {user.role === Role.TEACHER
            ? "مدرس"
            : user.role === "ADMIN"
              ? "مدير"
              : "طالب"}
        </p>
      </div>
    </div>
  );
};

export default UserBadge;
