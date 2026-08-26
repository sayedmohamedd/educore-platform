/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { teachersService } from "@/services/teachers.service";
import { Suspense } from "react";
import MentorsList from "./MentorsList";

const Mentors = async () => {
  let errorMessage = "";
  let teachers: any = [];
  try {
    const data = await teachersService.getTeachers();
    teachers = data.teachers;
  } catch (error: any) {
    errorMessage = error?.message;
  }
  return (
    <section>
      <div className="container py-16">
        <header className="flex-between flex-col gap-6 md:flex-row">
          <div className="text-start gap-2">
            <h2 className="text-3xl font-bold text-primary">
              تعلّم على يد أفضل المدربين
            </h2>

            <p className="max-w-2xl text-lg text-muted text-center md:text-right">
              نخبة من المدربين والخبراء المتخصصين لمساعدتك على اكتساب المهارات
              المطلوبة في سوق العمل وتحقيق أهدافك المهنية.
            </p>
          </div>

          <Link
            href="/signup"
            className="rounded-full bg-tertiary px-6 py-3 font-semibold text-white transition duration-300 hover:bg-indigo-700"
          >
            انضم كمدرب
          </Link>
        </header>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Suspense fallback={<h3>Loading Teachers...</h3>}>
          <MentorsList teachers={teachers} />
        </Suspense>
      </div>
    </section>
  );
};

export default Mentors;
