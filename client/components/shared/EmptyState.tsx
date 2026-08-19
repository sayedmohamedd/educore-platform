import { LucideIcon, Inbox } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  buttonText?: string;
  buttonHref?: string;
};

const EmptyState = ({
  title,
  description,
  icon: Icon = Inbox,
  buttonText,
  buttonHref,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-8 text-primary" />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {buttonText && buttonHref && (
        <Link
          href={buttonHref}
          className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
