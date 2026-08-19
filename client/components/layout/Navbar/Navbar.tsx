"use client";

import Link from "next/link";
import { TextAlignJustify, X } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/store/auth.store";

import NavbarLinks from "./NavbarLinks";
import SearchInput from "./SearchInput";
import NotificationButton from "./NotificationButton";
import TopButton from "@/components/shared/TopButton";

const Navbar = () => {
  const { user } = useAuthStore();
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

        <SearchInput className="hidden md:flex" />

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <NotificationButton />

              <Link
                href="/admin"
                className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
              >
                لوحة التحكم
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium text-primary transition-colors hover:text-primary-dark"
              >
                تسجيل الدخول
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
              >
                ابدأ الآن
              </Link>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 text-muted md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <TextAlignJustify size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container py-5">
            <SearchInput />

            <NavbarLinks
              className="mt-5 flex flex-col gap-5"
              onClick={closeMenu}
            />

            <div className="mt-5 flex flex-col gap-3 border-t pt-5">
              {user ? (
                <>
                  <NotificationButton />

                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
                  >
                    لوحة التحكم
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-md border border-primary px-4 py-2.5 text-center font-medium text-primary"
                  >
                    تسجيل الدخول
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
                  >
                    ابدأ الآن
                  </Link>
                </>
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
