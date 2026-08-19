import Link from "next/link";

type NavbarLinksProps = {
  className?: string;
  onClick?: () => void;
};

const NavbarLinks = ({ className, onClick }: NavbarLinksProps) => {
  return (
    <ul className={`flex gap-4 text-muted font-semibold ${className ?? ""}`}>
      <li>
        <Link href="/courses" onClick={onClick}>
          الكورسات
        </Link>
      </li>

      <li>
        <Link href="/teachers" onClick={onClick}>
          المدربين
        </Link>
      </li>

      <li>
        <Link href="/#" onClick={onClick}>
          الخدمات
        </Link>
      </li>

      <li>
        <Link href="/#" onClick={onClick}>
          المدونة
        </Link>
      </li>
    </ul>
  );
};

export default NavbarLinks;
