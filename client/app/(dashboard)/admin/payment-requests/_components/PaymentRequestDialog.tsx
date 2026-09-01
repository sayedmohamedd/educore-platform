/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AlertCircle,
  CalendarDays,
  Check,
  CreditCard,
  ExternalLink,
  FileText,
  Hash,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { PaymentRequest } from "./types";
import PaymentRequestStatus from "./PaymentRequestStatus";

type Props = {
  request: PaymentRequest | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
};

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString("en-US")} EGP`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PaymentRequestDialog = ({
  request,
  onClose,
  onApprove,
  onReject,
}: Props) => {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const func = async () => {
      setRejecting(false);
      setReason("");
    };

    func();
  }, [request]);

  if (!request) {
    return null;
  }

  const handleReject = () => {
    if (!reason.trim()) {
      return;
    }

    onReject(request.id, reason.trim());
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">
              Payment Request
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review the payment details and receipt.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
          {/* Details */}
          <div className="space-y-6">
            {/* Student */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Student
              </h3>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {request.student.name}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {request.student.email}
                  </p>
                </div>
              </div>
            </section>

            {/* Course */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Course
              </h3>

              <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
                <img
                  src={request.course.thumbnailUrl}
                  alt={request.course.title}
                  className="h-16 w-24 rounded-lg object-cover"
                />

                <p className="text-sm font-semibold text-slate-700">
                  {request.course.title}
                </p>
              </div>
            </section>

            {/* Payment Details */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Payment Details
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard size={16} />
                    <span className="text-xs">Amount</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {formatCurrency(request.amount)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard size={16} />
                    <span className="text-xs">Payment Method</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {request.paymentMethod.replace("_", " ")}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash size={16} />
                    <span className="text-xs">Reference</span>
                  </div>

                  <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                    {request.transferReference}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays size={16} />
                    <span className="text-xs">Transfer Date</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {formatDate(request.transferDate)}
                  </p>
                </div>
              </div>
            </section>

            {/* Note */}
            {request.note && (
              <section>
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  Student Note
                </h3>

                <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <FileText
                    size={18}
                    className="mt-0.5 shrink-0 text-muted-foreground"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    {request.note}
                  </p>
                </div>
              </section>
            )}

            {/* Rejection reason */}
            {request.status === "REJECTED" && request.rejectionReason && (
              <section>
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  Rejection Reason
                </h3>

                <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-sm leading-6 text-red-700">
                    {request.rejectionReason}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Receipt */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Payment Receipt
              </h3>

              <a
                href={request.receiptUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                Open
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={request.receiptUrl}
                alt="Payment receipt"
                className="max-h-130 w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        {request.status === "PENDING" && (
          <div className="border-t border-slate-200 px-6 py-5">
            {!rejecting ? (
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setRejecting(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <X size={17} />
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => onApprove(request.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  <Check size={17} />
                  Approve Payment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="rejection-reason"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Rejection Reason
                  </label>

                  <textarea
                    id="rejection-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="Explain why this payment request is being rejected..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setRejecting(false);
                      setReason("");
                    }}
                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={!reason.trim()}
                    onClick={handleReject}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={17} />
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentRequestDialog;
