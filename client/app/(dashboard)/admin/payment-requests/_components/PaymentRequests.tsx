"use client";

import { CheckCircle2, Clock3, CreditCard, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PaymentRequestCard from "./PaymentRequestCard";
import PaymentRequestDialog from "./PaymentRequestDialog";
import PaymentRequestsTable from "./PaymentRequestsTable";

import { adminClientService } from "@/services/admin/admin.client.service";
import { PaymentRequest } from "@/services/admin/types";
import { Meta } from "@/services/helpers";

type Props = {
  initialRequests: PaymentRequest[];
  meta: Meta;
};

const PaymentRequests = ({ initialRequests, meta }: Props) => {
  const [requests, setRequests] = useState<PaymentRequest[]>(initialRequests);

  useEffect(() => {
    const func = () => {
      setRequests(initialRequests);
    };

    func();
  }, [initialRequests]);

  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(
    null,
  );

  const [isApproving, setIsApproving] = useState(false);

  const stats = useMemo(() => {
    return {
      total: meta.total,

      pending: requests.filter((request) => request.status === "PENDING")
        .length,

      approved: requests.filter((request) => request.status === "APPROVED")
        .length,

      rejected: requests.filter((request) => request.status === "REJECTED")
        .length,
    };
  }, [requests, meta.total]);

  const handleApprove = async (id: string) => {
    try {
      setIsApproving(true);

      await adminClientService.approvePayment(id);

      setRequests((current) =>
        current.map((request) =>
          request.id === id
            ? {
                ...request,
                status: "APPROVED",
              }
            : request,
        ),
      );

      setSelectedRequest(null);
    } catch (error) {
      console.error("Failed to approve payment:", error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = (id: string, reason: string) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "REJECTED",
              rejectionReason: reason,
            }
          : request,
      ),
    );

    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6 px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">Payment Requests</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review student payment requests and manage course access.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Requests
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {stats.total}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {stats.pending}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Approved
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {stats.approved}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Rejected
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {stats.rejected}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle size={21} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <PaymentRequestsTable
          requests={requests}
          meta={meta}
          onSelect={setSelectedRequest}
        />

        <div className="mt-5 space-y-4 md:hidden">
          {requests.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                No payment requests found.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            requests.map((request) => (
              <PaymentRequestCard
                key={request.id}
                request={request}
                onSelect={setSelectedRequest}
              />
            ))
          )}
        </div>
      </div>

      <PaymentRequestDialog
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        isApproving={isApproving}
      />
    </div>
  );
};

export default PaymentRequests;
