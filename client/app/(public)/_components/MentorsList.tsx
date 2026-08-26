/* eslint-disable @typescript-eslint/no-explicit-any */
import MentorCard from "./MentorCard";

const MentorsList = ({ teachers }: { teachers: any[] }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {teachers.map((mentor: any) => (
        <MentorCard props={mentor} key={mentor.id} />
      ))}
    </div>
  );
};

export default MentorsList;
