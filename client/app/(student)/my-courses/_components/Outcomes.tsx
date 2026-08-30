import { CircleCheck } from "lucide-react";

const outcomes = [
  "Master data partitioning strategies.",
  "Understand distributed system design.",
  "Implement fault-tolerant architectures.",
  "Optimize for high availability and scalability.",
  "Apply microservices communication best practices.",
];

const Outcomes = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 xl:min-w-90">
      <h4 className="text-lg font-semibold text-slate-700">
        Learning Outcomes
      </h4>

      <ul className="mt-4 flex flex-col gap-3">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-2">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-500" />

            <span className="text-sm leading-5 text-muted-foreground">
              {outcome}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Outcomes;
