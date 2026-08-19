/* eslint-disable @typescript-eslint/no-explicit-any */
const QuizProgress = ({ currentQuestion, questions }: any) => {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  return (
    <>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>

        <span className="font-medium">{Math.round(progress)}%</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default QuizProgress;
