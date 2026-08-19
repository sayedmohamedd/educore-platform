const Stat = ({ count, text }: { count: string; text: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-5xl font-extrabold md:text-6xl">{count}</p>
      <p className="text-sm font-medium text-white/80 md:text-base">{text}</p>
    </div>
  );
};

export default Stat;
