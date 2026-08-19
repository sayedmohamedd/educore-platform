import { CircleCheck } from "lucide-react";

const data = [
  "Master data partitioning strategies.",
  "Understand the principles of distributed system design.",
  "Implement fault-tolerant architectures.",
  "Optimize for high availability and scalability.",
  "Apply best practices for microservices communication.",
];

const Outcomes = () => {
  return (
    <div className="shadow-md rounded-2xl p-4 min-w-max">
      <h4 className="section-title mb-4">Learning Outcomes</h4>
      <ul className="flex flex-col gap-4">
        {data.map((outcome) => (
          <li
            key={outcome}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <CircleCheck className="w-4 h-4 text-green-500 shrink-0" />
            <span className="text-muted text-sm">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Outcomes;
