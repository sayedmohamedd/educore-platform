/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "lucide-react";

const QuizNavigation = ({
  currentQuestion,
  setCurrentQuestion,
  setSubmitted,
  questions,
  selectedAnswer,
}: any) => {
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev: number) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev: number) => prev - 1);
    }
  };
  return (
    <div className="mt-8 flex items-center justify-between border-t pt-6">
      <button
        type="button"
        disabled={currentQuestion === 0}
        onClick={previousQuestion}
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <button
        type="button"
        disabled={selectedAnswer === undefined}
        onClick={nextQuestion}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {currentQuestion === questions.length - 1
          ? "Submit Quiz"
          : "Next Question"}

        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuizNavigation;
