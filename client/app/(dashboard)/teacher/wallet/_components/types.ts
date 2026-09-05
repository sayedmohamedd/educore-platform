export type Transaction = {
  id: string;
  type: "Course Sale" | "Withdrawal" | "Refund";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  createdAt: string;
};
