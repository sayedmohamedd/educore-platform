/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";
import { menuItems } from "@/lib/data";
import { HelpCircle, X } from "lucide-react";
import { Role } from "@/store/auth.store";

type Props = {
  role: Role;
  open?: boolean;
  onClose?: () => void;
};

const DashboardSidebar = ({ role, open = false, onClose }: Props) => {
  const pathname = usePathname();

  type MenuRole = keyof typeof menuItems;
  const menuRole = role.toLowerCase() as MenuRole;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-64 flex-col
          border-r border-border bg-background
          px-5 py-6
          transition-transform duration-200
          md:sticky md:top-0 md:z-auto
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="border-b border-border pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                <Link href="/" onClick={onClose}>
                  EDUCore
                </Link>
              </h1>

              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {role} Panel
              </p>
            </div>

            {/* Mobile Close */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary md:hidden"
              aria-label="Close dashboard menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1">
          <ul className="space-y-2">
            {menuItems[menuRole].map((item: any) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <button className="flex items-center gap-4 px-4 py-2">
          <HelpCircle size={20} className="text-muted-foreground" />

          <p className="text-muted">Help Center</p>
        </button>

        <LogoutButton />
      </aside>
    </>
  );
};

export default DashboardSidebar;
