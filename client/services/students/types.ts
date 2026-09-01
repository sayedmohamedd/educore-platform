export type CreatePaymentDto = {
  courseId: string;
  amount: number;
  recipientId: string;
  transactionId: string;
  couponCode?: string;
};
