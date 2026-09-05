import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  number: string;
  paragraph?: string;

  badgeContent?: string;
  badgeClassName?: string;

  Icon?: LucideIcon;
  IconBgClass?: string;
  IconClassName?: string;

  cardBgClass?: string;
  paragraphClassName?: string;
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
  IconClassName,
  paragraphClassName,
}: Props) => {
  return (
    <div
      className={`cursor-pointer rounded-lg p-4 shadow hover:card-up-hover ${
        cardBgClass || "bg-white"
      }`}
    >
      <div className="flex-between mb-6">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-md ${
            IconBgClass || "bg-primary/10"
          }`}
        >
          {Icon && (
            <Icon className={`h-5 w-5 ${IconClassName || "text-primary"}`} />
          )}
        </div>

        {badgeContent && (
          <p className={`rounded-md px-1.5 py-1 font-medium ${badgeClassName}`}>
            {badgeContent}
          </p>
        )}
      </div>

      <div className="mb-6">
        <p
          className={`mb-1 font-medium ${
            cardBgClass ? "text-white/90" : "text-slate-700"
          }`}
        >
          {title}
        </p>

        <span className="text-xl font-semibold">{number}</span>
      </div>

      {paragraph && (
        <p
          className={`text-sm ${paragraphClassName || "text-muted-foreground"}`}
        >
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default TransactionCard;
