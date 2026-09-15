"use client";

import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

enum TransactionType {
  COURSE_EARNING = "COURSE_EARNING",
  PLATFORM_EARNING = "PLATFORM_EARNING",
  REFUND = "REFUND",
  WITHDRAWAL = "WITHDRAWAL",
}

interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
  paymentId?: string | null;
  withdrawalId?: string | null;
}

type FilterType = "" | TransactionType;

interface TransactionsTableProps {
  transactions?: Transaction[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
  isLoading?: boolean;
}

const TransactionsTable = ({
  transactions = [],
  meta,
  isLoading,
}: TransactionsTableProps) => {
  const filters: TableFilter<FilterType>[] = [
    {
      key: "type",
      label: "Type",
      options: [
        { value: "", label: "All Transactions" },
        {
          value: TransactionType.COURSE_EARNING,
          label: "Course Earning",
        },
        {
          value: TransactionType.PLATFORM_EARNING,
          label: "Platform Earning",
        },
        {
          value: TransactionType.REFUND,
          label: "Refund",
        },
        {
          value: TransactionType.WITHDRAWAL,
          label: "Withdrawal",
        },
      ],
    },
  ];

  const typeLabels: Record<TransactionType, string> = {
    [TransactionType.COURSE_EARNING]: "Course Earning",
    [TransactionType.PLATFORM_EARNING]: "Platform Earning",
    [TransactionType.REFUND]: "Refund",
    [TransactionType.WITHDRAWAL]: "Withdrawal",
  };

  const typeClasses: Record<TransactionType, string> = {
    [TransactionType.COURSE_EARNING]: "bg-emerald-50 text-emerald-700",
    [TransactionType.PLATFORM_EARNING]: "bg-blue-50 text-blue-700",
    [TransactionType.REFUND]: "bg-red-50 text-red-700",
    [TransactionType.WITHDRAWAL]: "bg-amber-50 text-amber-700",
  };

  const columns: Column<Transaction>[] = [
    {
      key: "transaction",
      label: "Transaction",
      render: (transaction) => (
        <div className="min-w-45">
          <p className="font-medium text-slate-800">
            #{transaction.id.slice(-8)}
          </p>

          <p className="text-xs text-muted-foreground">
            {transaction.paymentId
              ? `Payment: ${transaction.paymentId.slice(-8)}`
              : transaction.withdrawalId
                ? `Withdrawal: ${transaction.withdrawalId.slice(-8)}`
                : "No reference"}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (transaction) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            typeClasses[transaction.type]
          }`}
        >
          {typeLabels[transaction.type]}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (transaction) => (
        <span className="font-medium text-slate-800">
          {Number(transaction.amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (transaction) => (
        <span className="text-sm text-slate-600">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(transaction.createdAt))}
        </span>
      ),
    },
    {
      key: "reference",
      label: "Reference",
      render: (transaction) => (
        <span className="text-sm text-slate-500">
          {transaction.paymentId
            ? transaction.paymentId.slice(-10)
            : transaction.withdrawalId
              ? transaction.withdrawalId.slice(-10)
              : "—"}
        </span>
      ),
    },
  ];

  return (
    <section className="my-4">
      <Table
        data={transactions}
        columns={columns}
        filters={filters}
        search={{
          placeholder: "Search transactions...",
        }}
        meta={meta}
        isLoading={isLoading}
        getRowKey={(transaction) => transaction.id}
        emptyMessage="No transactions found."
      />
    </section>
  );
};

export default TransactionsTable;
