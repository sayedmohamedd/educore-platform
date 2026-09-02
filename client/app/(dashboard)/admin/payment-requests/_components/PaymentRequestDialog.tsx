/* eslint-disable @next/next/no-img-element */
"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";

import PaymentRequestStatus from "./PaymentRequestStatus";
import { PaymentRequest } from "@/services/admin/types";

type Props = {
  request: PaymentRequest | null;
  onClose: () => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason: string) => void;
  isApproving: boolean;
};

const PaymentRequestDialog = ({
  request,
  onClose,
  onApprove,
  onReject,
  isApproving,
}: Props) => {
  const [rejectionReason, setRejectionReason] = useState("");

  if (!request) {
    return null;
  }

  const handleReject = () => {
    const reason = rejectionReason.trim();

    if (!reason) {
      return;
    }

    onReject(request.id, reason);
    setRejectionReason("");
  };

  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-700">
              Payment Request
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review payment details and receipt.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Student</h3>

            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-700">
                {request.user.fullName}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {request.user.email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Course</h3>

            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-700">
                {request.course.title}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-muted-foreground">Amount</p>

              <p className="mt-1 font-semibold text-slate-700">
                {Number(request.amount)} EGP
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-muted-foreground">Date</p>

              <p className="mt-1 font-medium text-slate-700">
                {new Date(request.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-muted-foreground">Status</p>

              <div className="mt-2">
                <PaymentRequestStatus status={request.status} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Payment Receipt
            </h3>

            <a
              href={request.receiptFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block overflow-hidden rounded-xl border border-slate-200"
            >
              <img
                src={request.receiptFile.url}
                alt="Payment receipt"
                className="max-h-[400px] w-full object-contain"
              />
            </a>
          </div>

          {request.status === "REJECTED" && request.rejectionReason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-700">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm text-red-600">
                {request.rejectionReason}
              </p>
            </div>
          )}

          {request.status === "PENDING" && (
            <div className="space-y-4 border-t border-slate-200 pt-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Rejection Reason
                </label>

                <textarea
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  placeholder="Enter rejection reason..."
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={isApproving || !rejectionReason.trim()}
                  className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => onApprove(request.id)}
                  disabled={isApproving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isApproving && (
                    <Loader2 size={17} className="animate-spin" />
                  )}

                  {isApproving ? "Approving..." : "Approve Payment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestDialog;
