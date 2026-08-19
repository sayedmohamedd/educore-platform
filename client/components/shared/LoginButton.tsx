import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="bg-primary text-white text-lg px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
    >
      login
    </Link>
  );
};

export default LoginButton;
