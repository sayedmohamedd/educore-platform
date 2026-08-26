import Link from "next/link";
// Icons
import { Rocket } from "lucide-react";
// Components
import CommonQuestion from "@/app/(public)/_components/CommonQuestion";
import StudentOpinion from "@/app/(public)/_components/StudentOpinion";
import Stat from "@/app/(public)/_components/Stat";
import FeaturedCourses from "./_components/FeaturedCourses";
import Categories from "./_components/Categories";
import Mentors from "./_components/Mentors";
// Data
import { stats, studentOpinions, commonQuestions } from "@/lib/data";


export default async function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <header className="relative overflow-hidden min-h-screen bg-linear-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white">
        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="container text-center py-32 mb-12">
          <div className="bg-white/10 w-fit text-sm font-medium mx-auto py-2 px-4 rounded-2xl flex-center gap-2">
            <Rocket />
            <p>Revolutionizing Digital Education</p>
          </div>
          <h2 className="text-6xl my-5 font-bold">
            The future of learning is{" "}
            <span className="text-tertiary">Limitless</span>.
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            أطلق العنان لإمكانياتك من خلال دورات تدريبية يقودها خبراء مصممة
            خصيصًا للعالم الحديث. اتقن المهارات المطلوبة بشدة من خلال تجارب
            تفاعلية ومجتمع داعم.
          </p>
          <div className="flex-center flex-col md:flex-row gap-4">
            <Link
              href="/courses"
              className="bg-tertiary min-w-50 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
            >
              اكتشف الكورسات
            </Link>
            <a
              href="#testimonials"
              className="bg-white/20 min-w-50 text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition duration-300"
            >
              اطلع على قصص النجاح
            </a>
          </div>
          {/* Trusted Students */}
          <section className="mt-8 flex-center gap-4">
            <p>يثق به أكثر من 15000 طالب حول العالم</p>
          </section>
        </div>
      </header>

      {/* Explore By Category */}
      <Categories />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Stats */}
      <section className="bg-primary">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 text-center text-white ">
          {stats.map((stat) => (
            <Stat key={stat.count} count={stat.count} text={stat.text} />
          ))}
        </div>
      </section>

      {/* Mentors */}
      <Mentors />

      {/* Student Opinions */}
      <section className="bg-[#ecedf9]" id="testimonials">
        <div className="container py-20">
          <h3 className="section-title">What Our Students Say</h3>
          <p className="text-lg text-muted mb-8">
            Real experiences from students who transformed their careers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {studentOpinions.map((opinion) => (
              <StudentOpinion key={opinion.studentName} {...opinion} />
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="bg-homeBg py-16">
        <div className="container flex-center flex-col gap-4">
          <h3 className="section-title mb-8">الاسئلة الشائعة</h3>
          {commonQuestions.map((question) => (
            <CommonQuestion key={question.title} {...question} />
          ))}
        </div>
      </section>

      {/* Ready to Start */}
      <section className="bg-homeBg pb-12 px-4 md:px-0">
        <div className="container bg-primary rounded-2xl text-center py-20 my-12">
          <h3 className="text-white text-2xl md:text-5xl font-bold mb-4">
            هل أنت مستعد لبدء رحلتك التعليمية؟
          </h3>
          <p className="text-white/80">
            قم بالتسجيل الان لتواصل مع المؤسسة وابداء رحلتك التعليمية
          </p>
          <div className="flex-center flex-col md:flex-row gap-4 mt-8">
            <Link
              href="/signup"
              className="bg-white text-primary font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
            >
              سجل مجاناً
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition duration-300"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
