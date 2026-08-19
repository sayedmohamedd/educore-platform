import { LucideIcon, TrendingUp } from "lucide-react";

type Props = {
  title: string;
  number: string;
  Icon: LucideIcon;
  percentage: number | string;
};

const StatsCard = ({ title, number, Icon, percentage }: Props) => {
  return (
    <section className="hover:card-up-hover rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          {Icon && <Icon className="text-primary" size={24} />}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
          <TrendingUp size={16} />
          <span>+{percentage}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <h3 className="text-3xl font-bold tracking-tight text-foreground">
          {number}
        </h3>
      </div>

      {/* <div className="mt-6 flex h-20 items-center justify-center rounded-xl bg-muted/40">
        <ChartArea className="h-12 w-12 text-primary/70" />
      </div> */}
    </section>
  );
};

export default StatsCard;
