const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <button
      className={`py-2 px-5 rounded-md cursor-pointer hover:scale-95 hover:opacity-85 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
