import { Quote } from "lucide-react";

type StudentOpinionProps = {
  studentName: string;
  content: string;
};

const StudentOpinion = ({ studentName, content }: StudentOpinionProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
      <Quote className="mb-4 h-8 w-8 text-secondary" />

      <p className="mb-4 text-lg leading-8 text-muted">{content}</p>

      <p className="text-lg font-bold text-slate-600">{studentName}</p>
    </div>
  );
};

export default StudentOpinion;
