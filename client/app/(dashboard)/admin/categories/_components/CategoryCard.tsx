import Button from "@/components/ui/Button";
import { GraduationCap, List, User } from "lucide-react";

type Props = {
  title: string;
  number: number;
};

const CategoryCard = ({ title, number }: Props) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <div className="flex-between mt-2">
        <User className="text-muted" />
        <List className="text-muted" />
      </div>
      <h4 className="text-xl font-medium mt-6 text-slate-800">{title}</h4>
      <p className="text-muted flex-center gap-2">
        <GraduationCap />
        {number} active courses
      </p>
      <div className="flex-between mt-8">
        <Button className="border-2 border-primary text-primary bg-white">
          Edit
        </Button>
        <Button className="bg-[#e2e7ff] text-[#2e293c]">Stats</Button>
      </div>
    </div>
  );
};

export default CategoryCard;
