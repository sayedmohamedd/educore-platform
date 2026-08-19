import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  Icon: LucideIcon;
  text: string;
  className?: string;
  href?: string;
};

const IconButton = ({ Icon, text, className, href }: Props) => {
  return href ? (
    <Link href={href} className={`btn gap-2 ${className}`}>
      <Icon />
      <span>{text}</span>
    </Link>
  ) : (
    <button className={`btn gap-2 ${className}`} type="button">
      <Icon />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
