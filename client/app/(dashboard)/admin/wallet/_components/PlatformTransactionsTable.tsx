"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  type LucideIcon,
  RotateCcw,
} from "lucide-react";

import { Column, TableFilter } from "@/components/shared/Table/types";
import Table from "@/components/shared/Table/Table";
import { PlatformTransaction, TransactionType } from "./types";

type Props = {
  transactions: PlatformTransaction[];
};

type FilterType = "ALL" | TransactionType;

const PlatformTransactionsTable = ({ transactions }: Props) => {
  const filters: TableFilter<FilterType>[] = [
    {
      key: "type",
      label: "Transaction Type",
      options: [
        {
          value: "ALL",
          label: "All Transactions",
        },
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

  const getTypeLabel = (type: TransactionType) => {
    const labels: Record<TransactionType, string> = {
      COURSE_EARNING: "Course Earning",
      PLATFORM_EARNING: "Platform Earning",
      REFUND: "Refund",
      WITHDRAWAL: "Withdrawal",
    };

    return labels[type];
  };

  const getTypeIcon = (type: TransactionType): LucideIcon => {
    switch (type) {
      case "COURSE_EARNING":
        return ArrowUpFromLine;

      case "PLATFORM_EARNING":
        return CircleDollarSign;

      case "REFUND":
        return RotateCcw;

      case "WITHDRAWAL":
        return ArrowDownToLine;

      default:
        return CircleDollarSign;
    }
  };

  const getTypeClass = (type: TransactionType) => {
    switch (type) {
      case "COURSE_EARNING":
        return "bg-blue-50 text-blue-700";

      case "PLATFORM_EARNING":
        return "bg-emerald-50 text-emerald-700";

      case "REFUND":
        return "bg-red-50 text-red-700";

      case "WITHDRAWAL":
        return "bg-amber-50 text-amber-700";
    }
  };

  const columns: Column<PlatformTransaction>[] = [
    {
      key: "transaction",
      label: "Transaction",
      render: (transaction) => (
        <div>
          <p className="text-sm font-semibold text-slate-700">
            #{transaction.id.slice(0, 8)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {transaction.paymentId
              ? `Payment #${transaction.paymentId.slice(0, 8)}`
              : transaction.withdrawalId
                ? `Withdrawal #${transaction.withdrawalId.slice(0, 8)}`
                : "No reference"}
          </p>
        </div>
      ),
    },

    {
      key: "type",
      label: "Type",
      render: (transaction) => {
        const Icon = getTypeIcon(transaction.type);

        return (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${getTypeClass(
              transaction.type,
            )}`}
          >
            <Icon size={14} />

            {getTypeLabel(transaction.type)}
          </span>
        );
      },
    },

    {
      key: "amount",
      label: "Amount",
      render: (transaction) => {
        const isRefund = transaction.type === "REFUND";

        return (
          <p
            className={`text-sm font-semibold ${
              isRefund ? "text-red-600" : "text-slate-700"
            }`}
          >
            {isRefund ? "-" : "+"}${Number(transaction.amount).toFixed(2)}
          </p>
        );
      },
    },

    {
      key: "date",
      label: "Date",
      render: (transaction) => (
        <p className="text-sm text-slate-600">
          {new Date(transaction.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      ),
    },
  ];

  return (
    <Table
      data={transactions}
      columns={columns}
      filters={filters}
      search={{
        placeholder: "Search transactions...",
      }}
      filterData={(transaction, { search, type }) => {
        const matchesType = type === "ALL" || transaction.type === type;

        const matchesSearch =
          !search ||
          transaction.id.toLowerCase().includes(search) ||
          transaction.paymentId?.toLowerCase().includes(search) ||
          transaction.withdrawalId?.toLowerCase().includes(search);

        return matchesType && Boolean(matchesSearch);
      }}
      getRowKey={(transaction) => transaction.id}
      emptyMessage="No transactions found."
    />
  );
};

export default PlatformTransactionsTable;
