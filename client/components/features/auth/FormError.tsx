import { CircleAlert } from "lucide-react";

type Props = {
  message?: string;
};

const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center gap-1 text-sm font-medium text-red-500">
      <CircleAlert size={16} />
      <span>{message}</span>
    </div>
  );
};

export default FormError;