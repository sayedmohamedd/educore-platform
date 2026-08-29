import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  Icon?: LucideIcon;
  text?: string;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

const IconButton = ({
  Icon,
  text,
  className,
  href,
  type,
  onClick,
  disabled,
  children,
}: Props) => {
  return href ? (
    <Link href={href} className={`btn gap-2 ${className}`} onClick={onClick}>
      {Icon && <Icon />}
      {text && <span>{text}</span>}
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={`btn gap-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {text && <span>{text}</span>}
      {children}
    </button>
  );
};

export default IconButton;
