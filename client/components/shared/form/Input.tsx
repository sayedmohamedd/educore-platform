import FormError from "@/components/features/auth/FormError";
import { cn } from "@/lib/utils";

type FormInputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, ...props }: FormInputProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={cn("input", error && "border-red-500 ...")}
      />

      <FormError message={error} />
    </div>
  );
};
export default Input;
