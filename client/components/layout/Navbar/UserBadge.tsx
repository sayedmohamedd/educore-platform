"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  GraduationCap,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Role, useAuthStore } from "@/store/auth.store";
import LogoutButton from "@/components/features/auth/LogoutButton";

interface UserBadgeProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const UserBadge = ({ mobile = false, onNavigate }: UserBadgeProps) => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const isStudent = user.role === Role.STUDENT;

  const roleLabel =
    user.role === Role.TEACHER
      ? "مدرس"
      : user.role === Role.ADMIN
        ? "مدير"
        : "طالب";

  const handleNavigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  /*
   * Mobile
   * نعرض الـ menu بشكل مباشر بدل dropdown
   */
  if (mobile) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* User Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={21} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">
              {user.fullName}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-2">
          {isStudent && (
            <Link
              href="/my-courses"
              onClick={handleNavigate}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
            >
              <GraduationCap className="size-4" />
              كورساتي
            </Link>
          )}

          <Link
            href="/profile"
            onClick={handleNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
          >
            <User className="size-4" />
            الملف الشخصي
          </Link>

          <Link
            href="/settings"
            onClick={handleNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
          >
            <Settings className="size-4" />
            الإعدادات
          </Link>

          <div className="my-1 border-t border-slate-100" />

          <LogoutButton />
        </div>
      </div>
    );
  }

  /*
   * Desktop Dropdown
   */
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
        aria-expanded={isOpen}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User size={20} />
        </div>

        <div className="hidden text-right lg:block">
          <p className="max-w-32 truncate text-sm font-semibold text-foreground">
            {user.fullName}
          </p>

          <p className="text-xs text-muted-foreground">{roleLabel}</p>
        </div>

        <ChevronDown
          className={`hidden size-4 text-slate-400 transition-transform lg:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
            {/* User Info */}
            <div className="mb-1 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={19} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700">
                  {user.fullName}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {roleLabel}
                </p>
              </div>
            </div>

            {/* My Courses */}
            {isStudent && (
              <Link
                href="/my-courses"
                onClick={handleNavigate}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
              >
                <GraduationCap className="size-4" />
                كورساتي
              </Link>
            )}

            {/* Profile */}
            <Link
              href="/profile"
              onClick={handleNavigate}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
            >
              <User className="size-4" />
              الملف الشخصي
            </Link>

            {/* Settings */}
            <Link
              href="/settings"
              onClick={handleNavigate}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
            >
              <Settings className="size-4" />
              الإعدادات
            </Link>

            <div className="my-1 border-t border-slate-100" />

            {/* Logout */}
            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default UserBadge;
