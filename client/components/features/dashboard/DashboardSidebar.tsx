"use client";
import { Role } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";
import { menuItems } from "@/lib/data";
import { HelpCircle } from "lucide-react";

const DashboardSidebar = ({ role }: { role: Role }) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-background px-5 py-6">
      {/* Logo */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary">
          <Link href="/">EDUCore</Link>
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {role} Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1">
        <ul className="space-y-2">
          {menuItems[role].map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
      {/* Logout */}
      <br className="text-muted" />
      <button className="flex items-center gap-4 px-4 py-2">
        <HelpCircle size={20} className="text-muted-foreground" />
        <p className="text-muted">Help Center</p>
      </button>
      <LogoutButton />
      {/* <div className="border-t border-border pt-5">
        <div className="rounded-xl bg-muted/40 p-4">
          <p className="text-sm font-semibold text-foreground">
            Teacher Account
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your courses and students.
          </p>
        </div>
      </div> */}
    </aside>
  );
};

export default DashboardSidebar;
