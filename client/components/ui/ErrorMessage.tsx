const ErrorMessage = ({ message }: { message: string }) => {
  return (
    message && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {message}
      </div>
    )
  );
};

export default ErrorMessage;
