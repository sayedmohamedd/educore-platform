"use client";

import { CheckCircle2, Clock3, CreditCard, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

import PaymentRequestCard from "./PaymentRequestCard";
import PaymentRequestDialog from "./PaymentRequestDialog";
import PaymentRequestFilters from "./PaymentRequestFilters";
import PaymentRequestsTable from "./PaymentRequestsTable";
import { adminClientService } from "@/services/admin/admin.client.service";
import { PaymentRequest, PaymentRequestFilter } from "@/services/admin/types";

type Props = {
  initialRequests: PaymentRequest[];
};

const PaymentRequests = ({ initialRequests }: Props) => {
  const [requests, setRequests] = useState<PaymentRequest[]>(initialRequests);

  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PaymentRequestFilter>("ALL");

  const [isApproving, setIsApproving] = useState(false);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesFilter = filter === "ALL" || request.status === filter;

      const matchesSearch =
        !normalizedSearch ||
        request.user.fullName.toLowerCase().includes(normalizedSearch) ||
        request.user.email.toLowerCase().includes(normalizedSearch) ||
        request.course.title.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [requests, search, filter]);

  const stats = useMemo(() => {
    return {
      total: requests.length,

      pending: requests.filter((request) => request.status === "PENDING")
        .length,

      approved: requests.filter((request) => request.status === "APPROVED")
        .length,

      rejected: requests.filter((request) => request.status === "REJECTED")
        .length,
    };
  }, [requests]);

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
        {/* Total */}
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

        {/* Pending */}
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

        {/* Approved */}
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

        {/* Rejected */}
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

      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <PaymentRequestFilters
            search={search}
            filter={filter}
            onSearchChange={setSearch}
            onFilterChange={setFilter}
          />
        </div>

        <PaymentRequestsTable
          requests={filteredRequests}
          onSelect={setSelectedRequest}
        />

        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm md:hidden">
              <p className="text-sm font-medium text-slate-600">
                No payment requests found.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
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
