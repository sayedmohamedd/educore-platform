import Footer from "@/components/layout/Footer";
import NotificationButton from "@/components/layout/Navbar/NotificationButton";
import CourseProgress from "./my-courses/_components/CourseProgress";
import UserBadge from "@/components/layout/Navbar/UserBadge";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex-between py-3.5">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">EduCore</h1>
          </Link>
          <div className="flex-center gap-4">
            <CourseProgress />
            <NotificationButton />
            <UserBadge />
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </>
  );
}
