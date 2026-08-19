const THeader = () => {
  return (
    <thead className="bg-slate-50">
      <tr className="border-b border-slate-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Transaction ID
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          User
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Role
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Amount
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Payment Method
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Date
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
          Status
        </th>

        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default THeader;
