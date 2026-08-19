import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
  color?: string;
}

const TeacherStatCard = ({
  icon: Icon,
  title,
  value,
  color = "bg-primary/10 text-primary",
}: Props) => {
  return (
    <div className="rounded-[28px] border border-border/40 bg-white p-6 backdrop-blur-xl transition hover:-translate-y-1">
      <div className="flex items-center gap-5">
        <div
          className={`flex size-16 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={30} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-3xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default TeacherStatCard;
