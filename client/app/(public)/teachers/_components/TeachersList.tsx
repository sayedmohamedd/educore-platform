import TeacherCard from "./TeacherCard";

type Teacher = {
  id: string;
  user: {
    fullName: string;
    avatar: {
      url: string;
    } | null;
  };
  title: string | null;
  bio: string | null;
  expertise: string | null;
  _count: {
    courses: number;
  };
};

type Props = {
  teachers: Teacher[];
};

const TeachersList = ({ teachers }: Props) => {
  if (!teachers.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
        <p className="text-sm text-muted-foreground">
          لا يوجد مدرسون متاحون حالياً.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
};

export default TeachersList;
