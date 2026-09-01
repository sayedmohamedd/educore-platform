import { Teacher } from "@/services/teachers/types";
import TeacherCard from "../teachers/_components/TeacherCard";

const MentorsList = ({ teachers }: { teachers: Teacher[] }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {teachers.map((teacher) => (
        <TeacherCard teacher={teacher} key={teacher.id} />
      ))}
    </div>
  );
};

export default MentorsList;
