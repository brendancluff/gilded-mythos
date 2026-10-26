
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { quizQuestions } from "@/lib/quiz/questions";

import type {
  HouseName,
  QuizQuestion,
  QuizResponses,
} from "@/lib/quiz/types";

type SubmissionResult = {
  success: boolean;
  testMode?: boolean;
  primaryHouse: HouseName;
  secondaryHouse: HouseName | null;
};

function shuffleQuestions(
  questions: QuizQuestion[]
): QuizQuestion[] {
  return questions.map((question) => {
    if (!question.randomizeAnswers) {
      return question;
    }

    const answers = [...question.answers];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [answers[i], answers[j]] = [
        answers[j],
        answers[i],
      ];
    }

    return {
      ...question,
      answers,
    };
  });
}

export default function SortingQuiz() {
  // Authentication and existing House checks
  const [checkingHouse, setCheckingHouse] = useState(true);
  const [alreadySorted, setAlreadySorted] = useState(false);
  const [houseCheckError, setHouseCheckError] =
    useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  // Quiz progress
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [responses, setResponses] =
    useState<QuizResponses>({});

  const [displayQuestions, setDisplayQuestions] =
    useState<QuizQuestion[]>(quizQuestions);

  // Quiz submission
  const [result, setResult] =
    useState<SubmissionResult | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submissionError, setSubmissionError] =
    useState<string | null>(null);

  // Check whether the user already has a House
  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkExistingHouse() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (authError || !user) {
        setNeedsLogin(true);
        setHouseCheckError(
          "Please sign in before taking the quiz."
        );
        setCheckingHouse(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("house_id")
        .eq("id", user.id)
        .single();

      if (!active) return;

      if (error || !data) {
        setHouseCheckError(
          "Unable to check your House assignment. Please try again."
        );
      } else {
        setAlreadySorted(data.house_id !== null);
      }

      setCheckingHouse(false);
    }

    void checkExistingHouse();

    return () => {
      active = false;
    };
  }, []);

  const currentQuestion = displayQuestions[currentIndex];
  const selectedAnswer = responses[currentQuestion.id];

  const progress =
    ((currentIndex + 1) / displayQuestions.length) * 100;

  function startQuiz() {
    if (
      checkingHouse ||
      alreadySorted ||
      houseCheckError ||
      isSubmitting
    ) {
      return;
    }

    setDisplayQuestions(shuffleQuestions(quizQuestions));
    setCurrentIndex(0);
    setResponses({});
    setResult(null);
    setSubmissionError(null);
    setHasStarted(true);
  }

  function selectAnswer(answerId: string) {
    if (isSubmitting) return;

    setResponses((previous) => ({
      ...previous,
      [currentQuestion.id]: answerId,
    }));

    setSubmissionError(null);
  }

  function goBack() {
    if (isSubmitting) return;

    setCurrentIndex((previous) =>
      Math.max(0, previous - 1)
    );

    setSubmissionError(null);
  }

  async function submitQuiz() {
    if (isSubmitting || alreadySorted) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setAlreadySorted(true);
          return;
        }

        if (response.status === 401) {
          setNeedsLogin(true);
          setHouseCheckError(
            "Your session has expired. Please sign in again."
          );
          return;
        }

        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to submit your quiz."
        );
      }

      if (
        data.success !== true ||
        typeof data.primaryHouse !== "string"
      ) {
        throw new Error(
          "Invalid response from the sorting server."
        );
      }

      const sortingResult = data as SubmissionResult;

      setResult(sortingResult);

      // After a permanent assignment, prevent another attempt.
      if (!sortingResult.testMode) {
        setAlreadySorted(true);
      }
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function goNext() {
    if (!selectedAnswer || isSubmitting) return;

    if (currentIndex === displayQuestions.length - 1) {
      void submitQuiz();
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  }

  function returnToStart() {
    if (alreadySorted) return;

    setHasStarted(false);
    setCurrentIndex(0);
    setResponses({});
    setResult(null);
    setSubmissionError(null);
  }

  // SCREEN 1: Checking account status
  if (checkingHouse) {
    return (
      <section className="sorting-quiz">
        <div className="sorting-welcome">
          <p className="eyebrow">
            KINARI ACADEMY
          </p>

          <h2>Preparing Your Sorting Ceremony</h2>

          <p>
            Checking your Kinari Academy House...
          </p>
        </div>
      </section>
    );
  }

  // SCREEN 2: Authentication or database error
  if (houseCheckError) {
    return (
      <section className="sorting-quiz">
        <div className="sorting-welcome">
          <p className="eyebrow">
            KINARI ACADEMY
          </p>

          <h2>Unable to Begin Sorting</h2>

          <p role="alert">{houseCheckError}</p>

          {needsLogin ? (
            <Link
              href="/login"
              className="sorting-start-button"
            >
              Sign In
            </Link>
          ) : (
            <button
              type="button"
              className="sorting-start-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          )}
        </div>
      </section>
    );
  }

  // SCREEN 3: House reveal
  // Keep this before the already-sorted screen so that
  // a successful permanent submission shows its result.
  if (result) {
    return (
      <section className="sorting-quiz">
        <div className="sorting-welcome">
          <p className="eyebrow">
            KINARI ACADEMY
          </p>

          <div
            className="quiz-coming-symbol"
            aria-hidden="true"
          >
            ✦
          </div>

          <h2>Your House Has Been Revealed!</h2>

          <p>Your primary House is:</p>

          <h2>{result.primaryHouse}</h2>

          {result.secondaryHouse && (
            <>
              <p>
                You have also been assigned
                a secondary House:
              </p>

              <h2>{result.secondaryHouse}</h2>
            </>
          )}

          {result.testMode ? (
            <>
              <p>
                This is a development preview.
                Your House assignment has not
                been permanently saved.
              </p>

              <button
                type="button"
                className="sorting-start-button"
                onClick={returnToStart}
              >
                Return to Start
              </button>
            </>
          ) : (
            <>
              <p>
                Your House assignment has been
                permanently saved to your profile.
              </p>

              <Link
                href="/profile"
                className="sorting-start-button"
              >
                View My House
              </Link>
            </>
          )}
        </div>
      </section>
    );
  }

  // SCREEN 4: User already has a House
  if (alreadySorted) {
    return (
      <section className="sorting-quiz">
        <div className="sorting-welcome">
          <p className="eyebrow">
            KINARI ACADEMY
          </p>

          <div
            className="quiz-coming-symbol"
            aria-hidden="true"
          >
            ✦
          </div>

          <h2>Your House Has Already Been Assigned</h2>

          <p>
            The sorting ceremony is a once-in-a-lifetime
            experience. Your House assignment is permanent.
          </p>

          <Link
            href="/profile"
            className="sorting-start-button"
          >
            View My House
          </Link>
        </div>
      </section>
    );
  }

  // SCREEN 5: Welcome
  if (!hasStarted) {
    return (
      <section className="sorting-quiz">
        <div className="sorting-welcome">
          <p className="eyebrow">
            THE SORTING CEREMONY
          </p>

          <div
            className="quiz-coming-symbol"
            aria-hidden="true"
          >
            ✦
          </div>

          <h2>Your Journey Begins Here</h2>

          <p>
            Eighteen questions stand between you
            and your place among the four Houses
            of Kinari Academy.
          </p>

          <p>
            Answer each question according to
            your instincts, and discover where
            your journey may lead.
          </p>

          <p>
            Your House assignment will be permanent
            once you complete the ceremony.
          </p>

          <button
            type="button"
            className="sorting-start-button"
            onClick={startQuiz}
          >
            ✦ Start Quiz ✦
          </button>
        </div>
      </section>
    );
  }

  // SCREEN 6: Quiz questions
  return (
    <section className="sorting-quiz">
      <div className="sorting-progress">
        <p>
          Question {currentIndex + 1} of{" "}
          {displayQuestions.length}
        </p>

        <progress
          value={progress}
          max={100}
          aria-label="Quiz progress"
        />
      </div>

      <div className="sorting-question">
        <h2>{currentQuestion.question}</h2>

        <div className="sorting-answers">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              type="button"
              className={
                selectedAnswer === answer.id
                  ? "sorting-answer selected"
                  : "sorting-answer"
              }
              onClick={() => selectAnswer(answer.id)}
              aria-pressed={
                selectedAnswer === answer.id
              }
              disabled={isSubmitting}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>

      {submissionError && (
        <p
          role="alert"
          style={{ color: "#f0d77c" }}
        >
          {submissionError}
        </p>
      )}

      <div className="sorting-navigation">
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0 || isSubmitting}
        >
          Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!selectedAnswer || isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : currentIndex === displayQuestions.length - 1
              ? "Finish Quiz"
              : "Next"}
        </button>
      </div>
    </section>
  );
}
