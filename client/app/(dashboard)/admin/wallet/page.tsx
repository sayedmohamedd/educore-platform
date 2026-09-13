import { adminServerService } from "@/services/admin/admin.server.service";
import { Meta } from "@/services/helpers";

import PlatformWallet from "./_components/PlatformWallet";
import { Wallet, WalletStats, WalletTransaction } from "./_components/types";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    type?: string;
  }>;
};

const PlatformWalletList = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  let transactions: WalletTransaction[] = [];
  let meta = {} as Meta;
  let stats: WalletStats = {} as WalletStats;
  let wallet: Wallet = {} as Wallet;
  try {
    const response = await adminServerService.getPlatformWalletAndTransactions({
      page,
      limit,
      search: params.search || "",
      ...(params.type && { type: params.type }),
    });

    transactions = response.transactions;
    stats = response.stats;
    meta = response.meta;
    wallet = response.wallet;
  } catch (error) {
    console.error(error);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlatformWallet
        wallet={wallet}
        transactions={transactions}
        meta={meta}
        stats={stats}
      />
    </Suspense>
  );
};

export default PlatformWalletList;

export const dynamic = "force-dynamic";
