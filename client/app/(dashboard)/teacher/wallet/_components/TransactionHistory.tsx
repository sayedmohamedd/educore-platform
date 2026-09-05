"use client";
import Table from "@/components/shared/Table/Table";
import { Column } from "@/components/shared/Table/types";
import { Transaction } from "./types";

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const transactionColumns: Column<Transaction>[] = [
    {
      key: "type",
      label: "Type",
      render: (transaction) => transaction.type,
    },
    {
      key: "amount",
      label: "Amount",
      render: (transaction) => (
        <span
          className={
            transaction.type === "Withdrawal" || transaction.type === "Refund"
              ? "font-medium text-red-600"
              : "font-medium text-emerald-600"
          }
        >
          {transaction.type === "Withdrawal" || transaction.type === "Refund"
            ? "-"
            : "+"}
          ${transaction.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (transaction) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            transaction.status === "Completed"
              ? "bg-emerald-50 text-emerald-700"
              : transaction.status === "Pending"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700"
          }`}
        >
          {transaction.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (transaction) => transaction.createdAt,
    },
  ];
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Transaction History
        </h2>

        <p className="text-sm text-muted-foreground">
          View your earnings and withdrawal transactions.
        </p>
      </div>

      <Table
        data={transactions}
        columns={transactionColumns}
        emptyMessage="No transactions found."
        getRowKey={(transaction) => transaction.id}
      />
    </section>
  );
};

export default TransactionHistory;
