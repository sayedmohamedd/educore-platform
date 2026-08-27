import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  Icon: LucideIcon;
  text: string;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const IconButton = ({ Icon, text, className, href, type, onClick }: Props) => {
  return href ? (
    <Link href={href} className={`btn gap-2 ${className}`} onClick={onClick}>
      <Icon />
      <span>{text}</span>
    </Link>
  ) : (
    <button type={type} className={`btn gap-2 ${className}`} onClick={onClick}>
      <Icon />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
