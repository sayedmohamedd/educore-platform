"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { TextAlignJustify, X } from "lucide-react";

import { useAuthStore, Role } from "@/store/auth.store";

import NavbarLinks from "./NavbarLinks";
import SearchInput from "./SearchInput";
import TopButton from "@/components/shared/TopButton";
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

        {/* Desktop Navigation */}
        <NavbarLinks className="hidden md:flex" />

        {/* Desktop Search */}
        <Suspense fallback={null}>
          <SearchInput className="hidden md:flex" />
        </Suspense>

        {/* Desktop User Area */}
        <div className="hidden items-center gap-4 md:flex">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />
          ) : user ? (
            <>
              {/* Student My Courses */}
              {user.role === Role.STUDENT && (
                <Link
                  href="/my-courses"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  كورساتي
                </Link>
              )}

              {/* Dashboard */}
              {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
                <Link
                  href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
                  className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
                >
                  لوحة التحكم
                </Link>
              )}

              {/* User Dropdown */}
              <UserBadge />
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-50 text-muted md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="cursor-pointer" size={28} />
          ) : (
            <TextAlignJustify className="cursor-pointer" size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container py-5">
            {/* Search */}
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>

            {/* Main Links */}
            <NavbarLinks
              className="mt-5 flex flex-col gap-5"
              onClick={closeMenu}
            />

            {/* User Area */}
            <div className="mt-5 flex flex-col gap-3 border-t pt-5">
              {loading ? (
                <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
              ) : user ? (
                <>
                  {/* Student My Courses */}
                  {/* {user.role === Role.STUDENT && (
                    <Link
                      href="/my-courses"
                      onClick={closeMenu}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      كورساتي
                    </Link>
                  )} */}

                  {/* Dashboard */}
                  {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
                    <Link
                      href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
                      onClick={closeMenu}
                      className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
                    >
                      لوحة التحكم
                    </Link>
                  )}

                  {/* User Profile / Dropdown */}
                  <UserBadge mobile onNavigate={closeMenu} />
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

// "use client";

// import Link from "next/link";
// import { Suspense, useState } from "react";
// import { TextAlignJustify, X } from "lucide-react";

// import { useAuthStore, Role } from "@/store/auth.store";

// import NavbarLinks from "./NavbarLinks";
// import SearchInput from "./SearchInput";
// import TopButton from "@/components/shared/TopButton";
// import UserBadge from "./UserBadge";

// const Navbar = () => {
//   const { user, loading } = useAuthStore();
//   const [isOpen, setIsOpen] = useState(false);

//   const closeMenu = () => setIsOpen(false);

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="container flex-between py-4">
//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-primary">
//           <Link href="/" onClick={closeMenu}>
//             EDUCore
//           </Link>
//         </h1>

//         {/* Desktop Navigation */}
//         <NavbarLinks className="hidden md:flex" />

//         {/* Desktop Search */}
//         <Suspense fallback={null}>
//           <SearchInput className="hidden md:flex" endpoint=""/>
//         </Suspense>

//         {/* Desktop User Area */}
//         <div className="hidden items-center gap-4 md:flex">
//           {loading ? (
//             <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />
//           ) : user ? (
//             <>
//               {/* Student My Courses */}
//               {user.role === Role.STUDENT && (
//                 <Link
//                   href="/my-courses"
//                   className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-primary/10 hover:text-primary"
//                 >
//                   كورساتي
//                 </Link>
//               )}

//               {/* Dashboard */}
//               {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
//                 <Link
//                   href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
//                   className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
//                 >
//                   لوحة التحكم
//                 </Link>
//               )}

//               {/* User Dropdown */}
//               <UserBadge />
//             </>
//           ) : (
//             <Link
//               href="/signup"
//               className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
//             >
//               ابدأ الآن
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="relative z-50 text-muted md:hidden"
//           aria-label="Toggle menu"
//           aria-expanded={isOpen}
//         >
//           {isOpen ? (
//             <X className="cursor-pointer" size={28} />
//           ) : (
//             <TextAlignJustify className="cursor-pointer" size={28} />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="border-t bg-white md:hidden">
//           <div className="container py-5">
//             {/* Search */}
//             <Suspense fallback={null}>
//               <SearchInput />
//             </Suspense>

//             {/* Main Links */}
//             <NavbarLinks
//               className="mt-5 flex flex-col gap-5"
//               onClick={closeMenu}
//             />

//             {/* User Area */}
//             <div className="mt-5 flex flex-col gap-3 border-t pt-5">
//               {loading ? (
//                 <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
//               ) : user ? (
//                 <>
//                   {/* Student My Courses */}
//                   {user.role === Role.STUDENT && (
//                     <Link
//                       href="/my-courses"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
//                     >
//                       كورساتي
//                     </Link>
//                   )}

//                   {/* Dashboard */}
//                   {(user.role === Role.ADMIN || user.role === Role.TEACHER) && (
//                     <Link
//                       href={user.role === Role.ADMIN ? "/admin" : "/teacher"}
//                       onClick={closeMenu}
//                       className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
//                     >
//                       لوحة التحكم
//                     </Link>
//                   )}

//                   {/* User Profile / Dropdown */}
//                   <UserBadge mobile onNavigate={closeMenu} />
//                 </>
//               ) : (
//                 <Link
//                   href="/signup"
//                   onClick={closeMenu}
//                   className="rounded-md bg-primary px-4 py-2.5 text-center text-white"
//                 >
//                   ابدأ الآن
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <TopButton />
//     </nav>
//   );
// };

// export default Navbar;