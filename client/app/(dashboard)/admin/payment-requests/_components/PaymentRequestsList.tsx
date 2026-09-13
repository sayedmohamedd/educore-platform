import { adminServerService } from "@/services/admin/admin.server.service";
import { PaymentRequest, PaymentRequestStatus } from "@/services/admin/types";

import PaymentRequests from "./PaymentRequests";
import { Meta } from "@/services/helpers";

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
};

const PaymentRequestsList = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  const validStatuses: PaymentRequestStatus[] = [
    "PENDING",
    "APPROVED",
    "REJECTED",
  ];

  const status = validStatuses.includes(params.status as PaymentRequestStatus)
    ? (params.status as PaymentRequestStatus)
    : undefined;

  let requests: PaymentRequest[] = [];
  let meta = {} as Meta;

  try {
    const response = await adminServerService.getPaymentRequests(
      {
        page,
        limit,
        search: params.search || "",
        ...(status && { status }),
      },
      { cache: "force-cache", next: { revalidate: 3600 } },
    );

    requests = response.payments;
    meta = response.meta;
  } catch (error) {
    console.error(error);
  }

  return <PaymentRequests initialRequests={requests} meta={meta} />;
};

export default PaymentRequestsList;
