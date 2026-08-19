import { tableData } from "@/lib/data";
import { Check, X } from "lucide-react";

const TBody = () => {
  return (
    <tbody>
      {tableData.map((transaction) => (
        <tr
          key={transaction.id}
          className="border-b border-slate-100 transition hover:bg-slate-50"
        >
          <td className="px-6 py-5 font-medium text-slate-800">
            {transaction.id}
          </td>

          <td className="px-6 py-5">{transaction.user}</td>

          <td className="px-6 py-5">{transaction.role}</td>

          <td className="px-6 py-5 font-semibold">{transaction.amount}</td>

          <td className="px-6 py-5">{transaction.payment}</td>

          <td className="px-6 py-5 text-slate-500">{transaction.date}</td>

          <td className="px-6 py-5">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                transaction.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : transaction.status === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {transaction.status}
            </span>
          </td>

          <td className="px-6 py-5">
            <div className="flex justify-end gap-2">
              <button className="flex size-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition hover:bg-green-100">
                <Check className="size-4" />
              </button>

              <button className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100">
                <X className="size-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
