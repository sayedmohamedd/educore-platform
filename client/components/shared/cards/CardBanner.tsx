import Image from "next/image";

// import StatusBadge from "./StatusBadge";

type Props = {
  image?: string;
  status?: string;
};

export default function CardBanner({ image, status }: Props) {
  return (
    <div className="relative h-44 overflow-hidden">
      {image && (
        <Image
          src={
            image.includes("cloudinary") ? image : "/courses/online-course.jpg"
          }
          // src="https://res.cloudinary.com/akcry6mk/image/upload/v1787851274/educore/cernujm18mgc59lhjib8.png"
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
