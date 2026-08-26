import Image from "next/image";

// import StatusBadge from "./StatusBadge";

type Props = {
  image?: string;
  status?: string;
};

export default function CardBanner({ image, status }: Props) {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl">
      {image && (
        <Image
          src="/courses/online-course.jpg"
          alt={"Course"}
          width={0}
          height={0}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      {status && (
        <div className="absolute left-4 top-4">
          {/* <StatusBadge status={status} /> */}
        </div>
      )}
    </div>
  );
}
