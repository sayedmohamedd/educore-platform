"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListChecks,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "1",
    question:
      "Which of the following is one of the main characteristics of a distributed system?",
    options: [
      "All components run on a single machine",
      "Components communicate over a network",
      "It does not require communication",
      "It only works with one database",
    ],
  },
  {
    id: "2",
    question:
      "Which approach is commonly used to improve the scalability of a system?",
    options: [
      "Horizontal scaling",
      "Removing all servers",
      "Using only one database connection",
      "Disabling caching",
    ],
  },
  {
    id: "3",
    question: "What is the main purpose of a load balancer?",
    options: [
      "Store application data",
      "Distribute traffic across multiple servers",
      "Replace the database",
      "Compile the application",
    ],
  },
  {
    id: "4",
    question:
      "Which principle helps a distributed system continue operating when one component fails?",
    options: [
      "Fault tolerance",
      "Single responsibility",
      "Static rendering",
      "Code duplication",
    ],
  },
  {
    id: "5",
    question:
      "Which architecture is commonly associated with independently deployable services?",
    options: [
      "Monolithic architecture",
      "Microservices architecture",
      "Single-tier architecture",
      "Static architecture",
    ],
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const selectAnswer = (answer: string) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  };

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Quiz submitted:", answers);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 py-5 sm:py-8">
      <div className="container max-w-5xl">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                Advanced Cloud Infrastructure & Design
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-700">
                Distributed Systems Quiz
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Test your understanding of this lesson.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
              <Clock3 className="size-4 text-primary" />
              <span>15:00</span>
            </div>
          </div>
        </header>

        {/* Progress */}
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListChecks className="size-5 text-primary" />

              <span className="text-sm font-semibold text-slate-700">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>

            <span className="text-sm text-muted-foreground">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </section>

        {/* Quiz */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Question */}
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <div className="mb-4 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {currentQuestion + 1}
            </div>

            <h2 className="max-w-3xl text-lg font-semibold leading-7 text-slate-700 sm:text-xl sm:leading-8">
              {question.question}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Select one answer.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 p-5 sm:p-7">
            {question.options.map((option, index) => {
              const isSelected = answers[question.id] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAnswer(option)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 hover:border-primary/30 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span
                    className={`flex-1 text-sm leading-6 ${
                      isSelected ? "font-medium text-primary" : "text-slate-700"
                    }`}
                  >
                    {option}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentQuestion === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={answeredCount !== questions.length}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Quiz
                <CheckCircle2 className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                Next
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </section>

        {/* Question Navigator */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Questions</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Click a question to jump directly to it.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {questions.map((item, index) => {
              const isCurrent = currentQuestion === index;
              const isAnswered = Boolean(answers[item.id]);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  className={`flex size-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
                    isCurrent
                      ? "border-primary bg-primary text-white"
                      : isAnswered
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-slate-200 bg-white text-slate-500 hover:border-primary/30"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default QuizPage;
// "use client";

// import { useState } from "react";
// import { Check } from "lucide-react";
// import { quizQuestions as questions } from "@/lib/data";
// import QuizNavigation from "@/app/(student)/my-courses/_components/quiz/QuizNavigation";
// import QuizOption from "@/app/(student)/my-courses/_components/quiz/QuizOption";
// import QuizProgress from "@/app/(student)/my-courses/_components/quiz/QuizProgress";

// export default function QuizPage() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<Record<number, number>>({});
//   const [submitted, setSubmitted] = useState(false);

//   const question = questions[currentQuestion];
//   const selectedAnswer = answers[currentQuestion];

//   const selectAnswer = (optionIndex: number) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: optionIndex,
//     }));
//   };

//   if (submitted) {
//     const score = questions.reduce(
//       (total, item, index) =>
//         total + (answers[index] === item.correctAnswer ? 1 : 0),
//       0,
//     );

//     const percentage = Math.round((score / questions.length) * 100);

//     return (
//       <div className="mx-auto w-full max-w-3xl px-4 py-10">
//         <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
//             <Check className="h-8 w-8" />
//           </div>

//           <h1 className="text-2xl font-semibold">Quiz Completed</h1>

//           <p className="mt-2 text-muted-foreground">
//             You have completed this quiz successfully.
//           </p>

//           <div className="my-8">
//             <p className="text-5xl font-bold">
//               {score}/{questions.length}
//             </p>
//             <p className="mt-2 text-muted-foreground">{percentage}% correct</p>
//           </div>

//           <div className="flex justify-center gap-3">
//             <button
//               className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
//               onClick={() => {
//                 setSubmitted(false);
//                 setCurrentQuestion(0);
//                 setAnswers({});
//               }}
//             >
//               Retry Quiz
//             </button>

//             <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
//               Back to Lesson
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-3xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <p className="text-sm text-muted-foreground">
//           Course Name / Lesson Name
//         </p>

//         <h1 className="mt-2 text-2xl font-semibold tracking-tight">
//           Lesson Quiz
//         </h1>

//         <QuizProgress currentQuestion={currentQuestion} questions={questions} />
//       </div>

//       {/* Question */}
//       <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
//         <div>
//           <span className="text-sm font-medium text-primary">
//             Question {currentQuestion + 1}
//           </span>

//           <h2 className="mt-3 text-xl font-semibold leading-relaxed">
//             {question.text}
//           </h2>
//         </div>

//         {/* Options */}
//         <div className="mt-8 space-y-3">
//           {question.options.map((option, index) => {
//             const selected = selectedAnswer === index;
//             return (
//               <QuizOption
//                 key={option}
//                 option={option}
//                 index={index}
//                 selected={selected}
//                 selectAnswer={selectAnswer}
//               />
//             );
//           })}
//         </div>

//         {/* Navigation */}
//         <QuizNavigation
//           currentQuestion={currentQuestion}
//           setCurrentQuestion={setCurrentQuestion}
//           setSubmitted={setSubmitted}
//           questions={questions}
//           selectedAnswer={selectedAnswer}
//         />
//       </div>
//     </div>
//   );
// }
