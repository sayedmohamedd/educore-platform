/* eslint-disable @typescript-eslint/no-explicit-any */
const QuizOption = ({ option, index, selected, selectAnswer }: any) => {
  return (
    <button
      key={option}
      type="button"
      onClick={() => selectAnswer(index)}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "bg-background"
        }`}
      >
        {String.fromCharCode(65 + index)}
      </span>

      <span className="text-sm font-medium">{option}</span>
    </button>
  );
};

export default QuizOption;
