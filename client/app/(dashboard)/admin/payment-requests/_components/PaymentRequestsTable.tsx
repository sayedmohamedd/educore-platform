import { PaymentRequest } from "@/services/admin/types";
import PaymentRequestStatus from "./PaymentRequestStatus";

type Props = {
  requests: PaymentRequest[];
  onSelect: (request: PaymentRequest) => void;
};

const PaymentRequestsTable = ({ requests, onSelect }: Props) => {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
      {requests.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-sm font-medium text-slate-600">
            No payment requests found.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Student
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Course
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {requests.map((request) => (
                <tr key={request.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-700">
                        {request.user.fullName}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {request.user.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {request.course.title}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {Number(request.amount)} EGP
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(request.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4">
                    <PaymentRequestStatus status={request.status} />
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => onSelect(request)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentRequestsTable;
