import Image from "next/image";

const UserMenu = () => {
  return (
    <Image
      src="/mentors/sayed.jpeg"
      alt="Sayed"
      width={0}
      height={0}
      sizes="100vw"
      className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-300"
    />
  );
};

export default UserMenu;
