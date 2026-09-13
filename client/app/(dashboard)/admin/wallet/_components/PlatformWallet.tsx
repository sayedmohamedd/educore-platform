"use client";

import { useMemo } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

import { TransactionType, WalletData, WalletTransaction } from "./types";

type FilterType = "ALL" | TransactionType;

type Stat = {
  title: string;
  value: number;
  Icon: LucideIcon;
  iconStyle: string;
};

const PlatformWallet = ({ wallet, transactions, stats }: WalletData) => {
  const statsData: Stat[] = useMemo(
    () => [
      {
        title: "Platform Balance",
        value: Number(wallet.balance),
        Icon: CircleDollarSign,
        iconStyle: "bg-blue-50 text-blue-600",
      },
      {
        title: "Platform Earnings",
        value: Number(stats.totalEarnings),
        Icon: ArrowUpFromLine,
        iconStyle: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Refunds",
        value: Number(stats.totalRefunds),
        Icon: RotateCcw,
        iconStyle: "bg-amber-50 text-amber-600",
      },
      {
        title: "Withdrawals",
        value: Number(stats.totalWithdrawals),
        Icon: ArrowDownToLine,
        iconStyle: "bg-red-50 text-red-600",
      },
    ],
    [stats, wallet.balance],
  );

  const filters: TableFilter<FilterType>[] = [
    {
      key: "type",
      label: "Type",
      options: [
        {
          value: "ALL",
          label: "All Transactions",
        },
        {
          value: TransactionType.PLATFORM_EARNING,
          label: "Platform Earnings",
        },
        {
          value: TransactionType.REFUND,
          label: "Refund",
        },
        {
          value: TransactionType.WITHDRAWAL,
          label: "Withdrawal",
        },
        {
          value: TransactionType.COURSE_EARNING,
          label: "Course Earnings",
        },
      ],
    },
  ];

  const columns: Column<WalletTransaction>[] = [
    {
      key: "transaction",
      label: "Transaction",
      render: (transaction) => (
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {getTransactionLabel(transaction.type)}
          </p>

          <p className="mt-1 text-xs text-slate-400">{transaction.id}</p>
        </div>
      ),
    },

    {
      key: "type",
      label: "Type",
      render: (transaction) => {
        const styles: Record<TransactionType, string> = {
          COURSE_EARNING: "bg-blue-50 text-blue-700",
          PLATFORM_EARNING: "bg-emerald-50 text-emerald-700",
          REFUND: "bg-amber-50 text-amber-700",
          WITHDRAWAL: "bg-red-50 text-red-700",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[transaction.type]}`}
          >
            {getTransactionLabel(transaction.type)}
          </span>
        );
      },
    },

    {
      key: "amount",
      label: "Amount",
      render: (transaction) => {
        const isNegative =
          transaction.type === "REFUND" || transaction.type === "WITHDRAWAL";

        return (
          <p
            className={`text-sm font-semibold ${
              isNegative ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {isNegative ? "-" : "+"}${Number(transaction.amount).toFixed(2)}
          </p>
        );
      },
    },

    {
      key: "date",
      label: "Date",
      render: (transaction) => (
        <p className="text-sm text-slate-600">
          {formatDate(transaction.createdAt)}
        </p>
      ),
    },

    {
      key: "reference",
      label: "Reference",
      render: (transaction) => (
        <p className="max-w-45 truncate text-sm text-slate-500">
          {transaction?.payment.id || transaction?.withdrawalId || "-"}
        </p>
      ),
    },
  ];

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Platform Wallet</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor platform balance, earnings, refunds, and withdrawals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <WalletStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Table
        data={transactions}
        columns={columns}
        filters={filters}
        search={{
          placeholder: "Search transactions...",
        }}
        // filterData={(transaction, { search, type }) => {
        //   const matchesType = type === "ALL" || transaction.type === type;

        //   const reference =
        //     transaction.reference ||
        //     transaction.paymentId ||
        //     transaction.withdrawalId ||
        //     "";

        //   const matchesSearch =
        //     !search ||
        //     transaction.id.toLowerCase().includes(search) ||
        //     reference.toLowerCase().includes(search) ||
        //     getTransactionLabel(transaction.type)
        //       .toLowerCase()
        //       .includes(search);

        //   return matchesType && matchesSearch;
        // }}
        getRowKey={(transaction) => transaction.id}
        emptyMessage="No transactions found."
      />
    </main>
  );
};

const WalletStatCard = ({ title, value, Icon, iconStyle }: Stat) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-700">
            ${Number(value).toFixed(2)}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
};

const getTransactionLabel = (type: TransactionType) => {
  const labels: Record<TransactionType, string> = {
    COURSE_EARNING: "Course Earnings",
    PLATFORM_EARNING: "Platform Earnings",
    REFUND: "Refund",
    WITHDRAWAL: "Withdrawal",
  };

  return labels[type];
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export default PlatformWallet;
