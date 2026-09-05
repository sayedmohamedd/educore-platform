import { ArrowDownToLine, Wallet } from "lucide-react";

const Withdraw = () => {
  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Withdraw Funds</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Withdraw your available earnings.
          </p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100">
          <Wallet className="size-5 text-slate-700" />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-muted-foreground">Available Balance</p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <p className="text-2xl font-bold text-slate-800">$8,450.80</p>

          <button
            type="button"
            className="text-sm font-medium text-slate-700 hover:underline"
          >
            Withdraw all
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="withdraw-amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Withdrawal Amount
          </label>

          <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-slate-400">
            <span className="text-sm text-muted-foreground">$</span>

            <input
              id="withdraw-amount"
              type="number"
              min="0"
              placeholder="0.00"
              className="w-full bg-transparent px-2 text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="payment-method"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment Method
          </label>

          <select
            id="payment-method"
            defaultValue=""
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
          >
            <option value="" disabled>
              Select payment method
            </option>

            <option value="bank">Bank Account</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <p className="text-xs text-muted-foreground">
          Minimum withdrawal amount: $10
        </p>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <ArrowDownToLine className="size-4" />
          Withdraw
        </button>
      </div>
    </section>
  );
};

export default Withdraw;
