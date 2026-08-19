import Image from "next/image";
import Link from "next/link";

const MentorCard = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary transition duration-300">
        <Image
          src="/mentors/sayed.jpeg"
          alt="mentor"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-lg font-bold text-gray-800">John Doe</h3>
        <p className="text-primary">Software Engineer at TechCorp</p>
        <p className="text-gray-600">4.5 (5k reviews)</p>
        <Link
          href="/mentor/john-doe"
          className="text-tertiary font-medium  hover:bg-primary-dark transition duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
