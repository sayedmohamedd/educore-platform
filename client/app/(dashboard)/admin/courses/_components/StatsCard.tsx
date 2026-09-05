import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  stats: number | string;
  title: string;
  iconStyle?: string;
};

const StatsCard = ({ Icon, stats, title, iconStyle }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-700">{stats}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
