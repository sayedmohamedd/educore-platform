import PaymentRequests from "./PaymentRequests";
import { Suspense } from "react";
import { adminServerService } from "@/services/admin/admin.server.service";
import { PaymentRequest } from "@/services/admin/types";

const PaymentRequestsList = async () => {
  let requests: PaymentRequest[] = [];
  let errorMessage: string = "";
  try {
    const data = await adminServerService.getPaymentRequests();
    requests = data.payments;
    console.log("Fetched payment requests:", data);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "";
  }

  return (
    <div className="px-8 py-4">
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">
          Something went wrong while loading payment requests.
        </p>
      )}
      <Suspense fallback={<div>Loading payment requests...</div>}>
        <PaymentRequests initialRequests={requests} />
      </Suspense>
    </div>
  );
};

export default PaymentRequestsList;
