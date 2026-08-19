import TeacherBio from "@/app/(public)/teachers/_components/TeacherBio";
import TeacherCourses from "@/app/(public)/teachers/_components/TeacherCourses";
import TeacherHero from "@/app/(public)/teachers/_components/TeacherHero";
import TeacherStats from "@/app/(public)/teachers/_components/TeacherStats";

const TeacherProfilePage = () => {
  return (
    <main className="relative overflow-hidden bg-[#ecedf9]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 ">
        <div className="absolute right-0 top-0 h-112.5 w-112.5 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="container py-12 space-y-16">
        {/* Hero */}
        <TeacherHero />

        {/* About + Stats */}
        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 h-full">
            <TeacherBio />
          </div>

          <aside className="lg:col-span-4">
            <TeacherStats />
          </aside>
        </section>

        {/* Courses */}
        <TeacherCourses />
      </div>
    </main>
  );
};

export default TeacherProfilePage;
