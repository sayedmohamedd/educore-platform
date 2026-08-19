"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { quizQuestions as questions } from "@/lib/data";
import QuizNavigation from "@/app/(learning)/learn/_components/quiz/QuizNavigation";
import QuizOption from "@/app/(learning)/learn/_components/quiz/QuizOption";
import QuizProgress from "@/app/(learning)/learn/_components/quiz/QuizProgress";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  if (submitted) {
    const score = questions.reduce(
      (total, item, index) =>
        total + (answers[index] === item.correctAnswer ? 1 : 0),
      0,
    );

    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-semibold">Quiz Completed</h1>

          <p className="mt-2 text-muted-foreground">
            You have completed this quiz successfully.
          </p>

          <div className="my-8">
            <p className="text-5xl font-bold">
              {score}/{questions.length}
            </p>
            <p className="mt-2 text-muted-foreground">{percentage}% correct</p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
              onClick={() => {
                setSubmitted(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
            >
              Retry Quiz
            </button>

            <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              Back to Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          Course Name / Lesson Name
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Lesson Quiz
        </h1>

        <QuizProgress currentQuestion={currentQuestion} questions={questions} />
      </div>

      {/* Question */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div>
          <span className="text-sm font-medium text-primary">
            Question {currentQuestion + 1}
          </span>

          <h2 className="mt-3 text-xl font-semibold leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Options */}
        <div className="mt-8 space-y-3">
          {question.options.map((option, index) => {
            const selected = selectedAnswer === index;
            return (
              <QuizOption
                key={option}
                option={option}
                index={index}
                selected={selected}
                selectAnswer={selectAnswer}
              />
            );
          })}
        </div>

        {/* Navigation */}
        <QuizNavigation
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setSubmitted={setSubmitted}
          questions={questions}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
}
