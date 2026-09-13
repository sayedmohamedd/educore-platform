import { Suspense } from "react";

import PaymentRequestsList from "./_components/PaymentRequestsList";
import PaymentRequestsSkeleton from "./_components/PaymentRequestsSkeleton";

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
};

const AdminPaymentRequestsPage = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={<PaymentRequestsSkeleton />}>
      <PaymentRequestsList searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminPaymentRequestsPage;

export const dynamic = "force-dynamic";
