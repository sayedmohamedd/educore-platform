import Footer from "@/components/layout/Footer";
import NotificationButton from "@/components/layout/Navbar/NotificationButton";
import CourseProgress from "./learn/_components/CourseProgress";
import UserMenu from "./learn/_components/UserMenu";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex-between py-5">
          <h1 className="text-2xl font-bold text-primary">EduCore</h1>
          <div className="flex-center gap-4">
            <CourseProgress />
            <NotificationButton />
            <UserMenu />
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </>
  );
}
