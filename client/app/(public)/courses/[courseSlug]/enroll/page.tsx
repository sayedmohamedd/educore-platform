/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clipboard,
  CreditCard,
  Loader2,
  Upload,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { courseClientService } from "@/services/courses/courses.client.service";
import { Course } from "@/services/courses/types";
import { mediaService } from "@/services/media/media.service";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";

const EnrollPage = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();

  const router = useRouter();

  const [course, setCourse] = useState<Course>();
  const [errorMessage, setErrorMessage] = useState("");

  const [amount, setAmount] = useState<string | number | undefined>();

  const [transactionId, setTransactionId] = useState("");
  const [transferDate, setTransferDate] = useState("");

  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [receiptProgress, setReceiptProgress] = useState(0);

  const [uploadError, setUploadError] = useState("");

  const [loading, setLoading] = useState(false);

  const paymentNumber = "01012345678";

  // Fetch Course
  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await courseClientService.getCourseBySlug(courseSlug);

        setCourse(data);
        setAmount(data?.price);
      } catch (error: any) {
        setErrorMessage(error?.message || "Failed to load course.");
      }
    };

    getCourse();
  }, [courseSlug]);

  // Cleanup preview
  useEffect(() => {
    return () => {
      if (receiptPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  // Copy Number
  const handleCopy = async () => {
    await navigator.clipboard.writeText(paymentNumber);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Receipt Change
  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploadError("");
    setReceiptProgress(0);

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Receipt image must be less than 5MB.");
      e.target.value = "";
      return;
    }

    // Cleanup old preview
    if (receiptPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(receiptPreview);
    }

    const preview = URL.createObjectURL(file);

    setReceipt(file);
    setReceiptPreview(preview);

    e.target.value = "";
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !transactionId || !transferDate || !receipt) {
      setUploadError("Please complete all payment details.");
      return;
    }

    try {
      setLoading(true);
      setUploadError("");

      /*
       * 1. Upload receipt directly to Cloudinary
       */
      setUploadingReceipt(true);
      setReceiptProgress(0);

      const result = await uploadToCloudinary({
        file: receipt,
        folder: "educore/payment-receipts",
        onProgress: setReceiptProgress,
      });

      /*
       * 2. Create Media record in database
       */
      const media = await mediaService.uploadMetadata({
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        filename: receipt.name,
        size: receipt.size,
        mimeType: receipt.type,
      });

      console.log("Receipt media:", media);

      /*
       * 3. الآن عندنا media.id
       *
       * هنا نبعت enrollment/payment request
       *
       * مثال:
       *
       * await enrollmentService.createEnrollment({
       *   courseId: course!.id,
       *   amount: Number(amount),
       *   transactionId,
       *   transferDate,
       *   receiptId: media.id,
       * });
       */

      router.replace("/my-courses");
    } catch (error: any) {
      console.error("Enrollment error:", error);

      setUploadError(error?.message || "Failed to submit enrollment request.");
    } finally {
      setUploadingReceipt(false);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-700">
            Course Enrollment
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete your payment and submit your enrollment request.
          </p>
        </header>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <section className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <CreditCard className="size-5 text-primary" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-700">
                      Course Information
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Review your enrollment details.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>

                      <h3 className="mt-1 font-semibold text-slate-700">
                        {course?.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Price</p>

                      <p className="mt-1 text-lg font-bold text-primary">
                        EGP {course?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <WalletCardsIcon />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-700">
                      Payment Instructions
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Transfer the course amount using the following method.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/10 bg-primary/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Payment Method
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        Vodafone Cash
                      </p>
                    </div>

                    <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <WalletCardsIcon />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Transfer Number
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold tracking-wide text-slate-700">
                        {paymentNumber}
                      </div>

                      <button
                        type="button"
                        onClick={handleCopy}
                        className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="size-4 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Clipboard className="size-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-primary/10 bg-white p-4">
                    <p className="text-sm font-medium text-slate-700">
                      Transfer exactly
                    </p>

                    <p className="mt-1 text-xl font-bold text-primary">
                      EGP {course?.price}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Make sure the transferred amount matches the course price.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-700">
                    Payment Details
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Provide the details of your transfer.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Amount */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Amount
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        value={amount ?? ""}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                        {!amount && "EGP"}
                      </span>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Transaction ID
                    </label>

                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter transaction ID"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  {/* Transfer Date */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Transfer Date
                    </label>

                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>

              {/* Receipt */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-700">
                    Transfer Receipt
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload a clear image of your payment receipt.
                  </p>
                </div>

                <label
                  htmlFor="receipt"
                  className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition ${
                    uploadingReceipt
                      ? "cursor-wait"
                      : "hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  {receiptPreview ? (
                    <>
                      <img
                        src={receiptPreview}
                        alt="Payment receipt preview"
                        className="mb-4 max-h-72 max-w-full rounded-xl object-contain"
                      />

                      <p className="text-sm font-semibold text-slate-700">
                        {receipt?.name}
                      </p>

                      {!uploadingReceipt && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Click to replace the receipt
                        </p>
                      )}

                      {/* Progress */}
                      {uploadingReceipt && (
                        <div className="mt-5 w-full max-w-md">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Loader2 className="size-4 animate-spin text-primary" />

                              <span className="text-sm font-medium text-slate-700">
                                Uploading receipt...
                              </span>
                            </div>

                            <span className="text-sm font-semibold text-primary">
                              {receiptProgress}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-primary transition-[width] duration-200"
                              style={{
                                width: `${receiptProgress}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <Upload className="size-6 text-primary" />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        Upload payment receipt
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG or JPEG up to 5MB
                      </p>
                    </>
                  )}

                  <input
                    id="receipt"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    disabled={uploadingReceipt || loading}
                    onChange={handleReceiptChange}
                  />
                </label>

                {uploadError && (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {uploadError}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || uploadingReceipt}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {uploadingReceipt
                      ? "Uploading Receipt..."
                      : "Submitting..."}
                  </>
                ) : (
                  "Submit Enrollment Request"
                )}
              </button>
            </form>
          </section>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <h2 className="font-semibold text-slate-700">
                  Enrollment Summary
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your enrollment request details.
                </p>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-xs text-muted-foreground">Course</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {course?.title}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm text-muted-foreground">
                    Course Price
                  </span>

                  <span className="font-semibold text-slate-700">
                    EGP {course?.price}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm text-muted-foreground">
                    Amount to Pay
                  </span>

                  <span className="text-lg font-bold text-primary">
                    EGP {course?.price || "0"}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>

                  <p className="text-xs leading-5 text-muted-foreground">
                    Your enrollment will remain pending until an admin reviews
                    and verifies your payment.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

function WalletCardsIcon() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
      <CreditCard className="size-5 text-primary" />
    </div>
  );
}

export default EnrollPage;
