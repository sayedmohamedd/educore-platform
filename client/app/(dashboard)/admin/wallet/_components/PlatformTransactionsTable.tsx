"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

import { TransactionType, WalletTransaction } from "./types";
import { Meta } from "@/services/helpers";

type Props = {
  transactions: WalletTransaction[];
  meta: Meta;
};

type FilterType = "" | TransactionType;

const PlatformTransactionsTable = ({ transactions, meta }: Props) => {
  const filters: TableFilter<FilterType>[] = [
    {
      key: "type",
      label: "Type",
      options: [
        {
          value: "",
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
    switch (type) {
      case TransactionType.COURSE_EARNING:
        return "Course Earning";

      case TransactionType.PLATFORM_EARNING:
        return "Platform Earning";

      case TransactionType.REFUND:
        return "Refund";

      case TransactionType.WITHDRAWAL:
        return "Withdrawal";

      default:
        return type;
    }
  };

  const getTypeIcon = (type: TransactionType): LucideIcon => {
    switch (type) {
      case TransactionType.COURSE_EARNING:
      case TransactionType.PLATFORM_EARNING:
        return ArrowDownToLine;

      case TransactionType.REFUND:
        return RotateCcw;

      case TransactionType.WITHDRAWAL:
        return ArrowUpFromLine;

      default:
        return CircleDollarSign;
    }
  };

  const getTypeClass = (type: TransactionType) => {
    switch (type) {
      case TransactionType.COURSE_EARNING:
      case TransactionType.PLATFORM_EARNING:
        return "bg-emerald-50 text-emerald-700";

      case TransactionType.REFUND:
        return "bg-red-50 text-red-700";

      case TransactionType.WITHDRAWAL:
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  const columns: Column<WalletTransaction>[] = [
    {
      key: "transaction",
      label: "Transaction",
      render: (transaction) => (
        <div>
          <p className="font-medium text-slate-800">
            #{transaction.id.slice(0, 8)}
          </p>

          <p className="text-xs text-muted-foreground">
            {transaction.payment.id
              ? `Payment: ${transaction.payment.id}`
              : transaction.withdrawalId
                ? `Withdrawal: ${transaction.withdrawalId}`
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
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getTypeClass(
              transaction.type,
            )}`}
          >
            <Icon className="size-3.5" />

            {getTypeLabel(transaction.type)}
          </span>
        );
      },
    },

    {
      key: "amount",
      label: "Amount",
      render: (transaction) => {
        const isNegative =
          transaction.type === TransactionType.REFUND ||
          transaction.type === TransactionType.WITHDRAWAL;

        return (
          <span
            className={
              isNegative
                ? "font-medium text-red-600"
                : "font-medium text-emerald-600"
            }
          >
            {isNegative ? "-" : "+"}${Number(transaction.amount).toFixed(2)}
          </span>
        );
      },
    },

    {
      key: "createdAt",
      label: "Date",
      render: (transaction) =>
        new Date(transaction.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
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
      meta={meta}
      getRowKey={(transaction) => transaction.id}
      emptyMessage="No transactions found."
    />
  );
};

export default PlatformTransactionsTable;
