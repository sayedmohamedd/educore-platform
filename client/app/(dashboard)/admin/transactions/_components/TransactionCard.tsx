import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  number: string;
  paragraph?: string;
  badgeContent?: string;
  badgeClassName?: string;
  Icon?: LucideIcon;
  cardBgClass?: string;
  IconBgClass?: string;
};

const TransactionCard = ({
  title,
  number,
  Icon,
  badgeContent,
  paragraph,
  badgeClassName,
  cardBgClass,
  IconBgClass,
}: Props) => {
  return (
    <div
      className={`rounded-lg ${"bg-white"} p-4 shadow cursor-pointer hover:card-up-hover`}
    >
      <div className="flex-between mb-6">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-md ${IconBgClass || "bg-primary/10"} `}
        >
          {Icon && <Icon className={`h-5 w-5 text-primary`} />}
        </div>

        {badgeContent && (
          <p className={`rounded-md ${badgeClassName} px-1.5 py-1 font-medium`}>
            {badgeContent}
          </p>
        )}
      </div>

      <div className="mb-6">
        <p className="mb-1 font-medium text-slate-700">{title}</p>
        <span className="text-xl font-semibold">{number}</span>
      </div>

      <p className="text-sm text-muted-foreground">{paragraph}</p>
    </div>
  );
};

export default TransactionCard;
