"use client";

import { useMemo } from "react";
import {
  ArrowDownToLine,
  CircleDollarSign,
  RotateCcw,
  WalletCards,
} from "lucide-react";
import { Column, TableFilter } from "@/components/shared/Table/types";
import StatsCard from "../../courses/_components/StatsCard";
import Table from "@/components/shared/Table/Table";
import {
  PlatformWalletData,
  PlatformTransaction,
  TransactionType,
} from "./types";

const PlatformWallet = () => {
  const wallet: PlatformWalletData = {
    id: "platform-wallet",
    balance: "12500.00",
    updatedAt: new Date().toISOString(),

    transactions: [
      {
        id: "tx_001",
        walletId: "",
        platformWalletId: "platform-wallet",
        paymentId: "payment_001",
        withdrawalId: null,
        amount: "150.00",
        type: TransactionType.PLATFORM_EARNING,
        createdAt: new Date().toISOString(),
      },
      {
        id: "tx_002",
        walletId: "",
        platformWalletId: "platform-wallet",
        paymentId: "payment_002",
        withdrawalId: null,
        amount: "50.00",
        type: TransactionType.REFUND,
        createdAt: new Date().toISOString(),
      },
      {
        id: "tx_003",
        walletId: "",
        platformWalletId: "platform-wallet",
        paymentId: null,
        withdrawalId: "withdrawal_001",
        amount: "500.00",
        type: TransactionType.WITHDRAWAL,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const transactions = wallet?.transactions ?? [];

  const stats = useMemo(() => {
    const platformEarnings = transactions
      .filter(
        (transaction) => transaction.type === TransactionType.PLATFORM_EARNING,
      )
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const refunds = transactions
      .filter((transaction) => transaction.type === TransactionType.REFUND)
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const withdrawals = transactions
      .filter((transaction) => transaction.type === TransactionType.WITHDRAWAL)
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    return {
      platformEarnings,
      refunds,
      withdrawals,
    };
  }, [transactions]);

  const filters: TableFilter[] = [
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

  const typeLabels: Record<TransactionType, string> = {
    COURSE_EARNING: "Course Earning",
    PLATFORM_EARNING: "Platform Earning",
    REFUND: "Refund",
    WITHDRAWAL: "Withdrawal",
  };

  const getTypeClass = (type: TransactionType) => {
    switch (type) {
      case TransactionType.COURSE_EARNING:
        return "bg-blue-50 text-blue-700";

      case TransactionType.PLATFORM_EARNING:
        return "bg-emerald-50 text-emerald-700";

      case TransactionType.REFUND:
        return "bg-red-50 text-red-700";

      case TransactionType.WITHDRAWAL:
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-slate-100 text-slate-700";
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
      render: (transaction) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTypeClass(
            transaction.type,
          )}`}
        >
          {typeLabels[transaction.type]}
        </span>
      ),
    },

    {
      key: "amount",
      label: "Amount",
      render: (transaction) => {
        const isRefund = transaction.type === TransactionType.REFUND;

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

    {
      key: "reference",
      label: "Reference",
      render: (transaction) => {
        if (transaction.paymentId) {
          return <span className="text-sm text-slate-500">Payment</span>;
        }

        if (transaction.withdrawalId) {
          return <span className="text-sm text-slate-500">Withdrawal</span>;
        }

        return <span className="text-sm text-slate-400">—</span>;
      },
    },
  ];

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Platform Wallet</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor the platform balance and financial transactions.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          Icon={WalletCards}
          stats={`$${Number(wallet.balance).toFixed(2)}`}
          title="Platform Balance"
          iconStyle="bg-blue-50 text-blue-600"
        />

        <StatsCard
          Icon={CircleDollarSign}
          stats={`$${stats.platformEarnings.toFixed(2)}`}
          title="Platform Earnings"
          iconStyle="bg-emerald-50 text-emerald-600"
        />

        <StatsCard
          Icon={RotateCcw}
          stats={`$${stats.refunds.toFixed(2)}`}
          title="Refunds"
          iconStyle="bg-red-50 text-red-600"
        />

        <StatsCard
          Icon={ArrowDownToLine}
          stats={`$${stats.withdrawals.toFixed(2)}`}
          title="Withdrawals"
          iconStyle="bg-amber-50 text-amber-600"
        />
      </section>

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
            transaction.withdrawalId?.toLowerCase().includes(search) ||
            typeLabels[transaction.type].toLowerCase().includes(search);

          return matchesType && Boolean(matchesSearch);
        }}
        getRowKey={(transaction) => transaction.id}
        emptyMessage="No transactions found."
      />
    </main>
  );
};

export default PlatformWallet;
