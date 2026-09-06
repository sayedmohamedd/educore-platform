import { Suspense } from "react";

import PaymentRequestsList from "./_components/PaymentRequestsList";
import PaymentRequestsSkeleton from "./_components/PaymentRequestsSkeleton";

const AdminPaymentRequestsPage = () => {
  return (
    <Suspense fallback={<PaymentRequestsSkeleton />}>
      <PaymentRequestsList />
    </Suspense>
  );
};

export default AdminPaymentRequestsPage;
