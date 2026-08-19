import { Quote } from "lucide-react";

type StudentOpinionProps = {
  studentName: string;
  content: string;
};

const StudentOpinion = ({ studentName, content }: StudentOpinionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <Quote className="text-secondary w-8 h-8 mb-4" />
      <p className="text-lg text-muted mb-4">{content}</p>
      <p className="font-bold text-lg text-slate-600">{studentName}</p>
    </div>
  );
};

export default StudentOpinion;
