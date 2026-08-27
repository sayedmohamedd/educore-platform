"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
// Icons
import { TextAlignJustify, X } from "lucide-react";

import { useAuthStore, Role } from "@/store/auth.store";

// Components
import NavbarLinks from "./NavbarLinks";
import SearchInput from "./SearchInput";
import NotificationButton from "./NotificationButton";
import TopButton from "@/components/shared/TopButton";
import LogoutButton from "@/components/features/auth/LogoutButton";
import UserBadge from "./UserBadge";

const Navbar = () => {
  const { user, loading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex-between py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">
          <Link href="/" onClick={closeMenu}>
            EDUCore
          </Link>
        </h1>

        {/* Desktop */}
        <NavbarLinks className="hidden md:flex" />

        <Suspense fallback={null}>
          <SearchInput className="hidden md:flex" />
        </Suspense>

        <div className="hidden items-center gap-4 md:flex">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />
          ) : user ? (
            <>
              {/* <NotificationButton /> */}

              <UserBadge />

              {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
                <Link
                  href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
                  className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
                >
                  لوحة التحكم
                </Link>
              )}

              <LogoutButton />
            </>
          ) : (
            <Link
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
            >
              ابدأ الآن
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 text-muted md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="fill-muted cursor-pointer" size={28} />
          ) : (
            <TextAlignJustify className="fill-muted cursor-pointer" size={28} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container py-5">
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>

            <NavbarLinks
              className="mt-5 flex flex-col gap-5"
              onClick={closeMenu}
            />

            <div className="mt-5 flex flex-col gap-3 border-t pt-5">
              {loading ? (
                <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
              ) : user ? (
                <>
                  {/* <NotificationButton /> */}

                  <UserBadge />
                  {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
                    <Link
                      href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
                      onClick={closeMenu}
                      className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
                    >
                      لوحة التحكم
                    </Link>
                  )}

                  <LogoutButton />
                </>
              ) : (
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
                >
                  ابدأ الآن
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <TopButton />
    </nav>
  );
};

export default Navbar;
