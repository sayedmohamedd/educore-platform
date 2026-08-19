import Image from "next/image";

import StatusBadge from "./StatusBadge";

type CourseStatus = "published" | "draft" | "archived";

type Props = {
  image: string;
  status: CourseStatus;
};

export default function CardBanner({ image, status }: Props) {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl">
      <Image src={image} alt={image} width={0} height={0} fill className="object-cover" />

      <div className="absolute left-4 top-4">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
