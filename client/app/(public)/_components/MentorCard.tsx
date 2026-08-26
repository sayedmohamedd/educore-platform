import Image from "next/image";
import Link from "next/link";

import type { Teacher } from "@/services/teachers.service";

const MentorCard = ({ props }: { props: Teacher }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary transition duration-300">
        <Image
          src="/mentors/sayed.jpeg"
          alt="mentor"
          width={300}
          height={300}
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-lg font-bold text-gray-800">
          {props.user.fullName}
        </h3>
        <p className="text-primary">{props.title}</p>
        <p className="text-gray-600">4.5 (5k reviews)</p>
        <Link
          href={`/teachers/${props.id}`}
          className="text-tertiary font-medium  hover:bg-primary-dark transition duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
