const TableHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Purchase Requests
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage all purchase transactions.
        </p>
      </div>
    </div>
  );
};

export default TableHeader;
