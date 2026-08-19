import {
  BookOpen,
  Star,
  Users,
} from "lucide-react";

import TeacherStatCard from "./TeacherStatCard";

const TeacherStats = () => {
  return (
    <section className="space-y-5">
      <TeacherStatCard
        icon={Users}
        title="إجمالي الطلاب"
        value="+12,450"
      />

      <TeacherStatCard
        icon={BookOpen}
        title="عدد الدورات"
        value="8"
        color="bg-violet-500/10 text-violet-600"
      />

      <TeacherStatCard
        icon={Star}
        title="متوسط التقييم"
        value="4.9"
        color="bg-emerald-500/10 text-emerald-600"
      />
    </section>
  );
};

export default TeacherStats;