import { quizQuestions } from "./questions";
import type {
  HouseName,
  HouseScores,
  QuizResponses,
  SortingResult,
} from "./types";

const HOUSES: HouseName[] = [
  "Solara",
  "Lunaris",
  "Atherion",
  "Spiraxus",
];

const TIE_BREAKER_QUESTIONS = [3, 5, 12, 10];

const FALLBACK_PRIORITY: HouseName[] = [
  "Solara",
  "Lunaris",
  "Atherion",
  "Spiraxus",
];

function resolveTie(
  tiedHouses: HouseName[],
  responses: QuizResponses
): HouseName {
  if (tiedHouses.length === 0) {
    throw new Error("No eligible Houses for tie-breaking.");
  }

  if (tiedHouses.length === 1) {
    return tiedHouses[0];
  }

  for (const questionId of TIE_BREAKER_QUESTIONS) {
    const question = quizQuestions.find(
      (item) => item.id === questionId
    );

    const answer = question?.answers.find(
      (item) => item.id === responses[questionId]
    );

    if (!answer) {
      throw new Error("Invalid tie-breaker response.");
    }

    const matchingHouses = answer.houses.filter(
      (house) => tiedHouses.includes(house)
    );

    if (matchingHouses.length === 1) {
      return matchingHouses[0];
    }
  }

  const fallback = FALLBACK_PRIORITY.find(
    (house) => tiedHouses.includes(house)
  );

  if (!fallback) {
    throw new Error("Unable to resolve House tie.");
  }

  return fallback;
}

function highestScoringHouses(
  scores: HouseScores,
  eligibleHouses: HouseName[]
): HouseName[] {
  if (eligibleHouses.length === 0) {
    throw new Error("No eligible Houses.");
  }

  const highestScore = Math.max(
    ...eligibleHouses.map((house) => scores[house])
  );

  return eligibleHouses.filter(
    (house) => scores[house] === highestScore
  );
}

export function calculateSortingResult(
  responses: QuizResponses
): SortingResult {
  if (
    !responses ||
    typeof responses !== "object" ||
    Array.isArray(responses)
  ) {
    throw new Error("Invalid quiz responses.");
  }

  const scores: HouseScores = {
    Solara: 0,
    Lunaris: 0,
    Atherion: 0,
    Spiraxus: 0,
  };

  const submittedQuestionIds = Object.keys(responses);

  if (submittedQuestionIds.length !== quizQuestions.length) {
    throw new Error("All 18 questions must be answered.");
  }

  for (const question of quizQuestions) {
    const selectedAnswerId = responses[question.id];

    if (typeof selectedAnswerId !== "string") {
      throw new Error(
        `Missing answer for question ${question.id}.`
      );
    }

    const selectedAnswer = question.answers.find(
      (answer) => answer.id === selectedAnswerId
    );

    if (!selectedAnswer) {
      throw new Error(
        `Invalid answer for question ${question.id}.`
      );
    }

    for (const house of selectedAnswer.houses) {
      scores[house] += 1;
    }
  }

  const primaryCandidates = highestScoringHouses(
    scores,
    HOUSES
  );

  // Spiraxus automatically wins any first-place tie
  // involving Spiraxus.
  const primaryHouse: HouseName =
    primaryCandidates.includes("Spiraxus")
      ? "Spiraxus"
      : resolveTie(primaryCandidates, responses);

  let secondaryHouse: HouseName | null = null;

  if (primaryHouse === "Spiraxus") {
    const secondaryCandidates = highestScoringHouses(
      scores,
      HOUSES.filter((house) => house !== "Spiraxus")
    );

    secondaryHouse = resolveTie(
      secondaryCandidates,
      responses
    );
  }

  return {
    primaryHouse,
    secondaryHouse,
    scores,
  };
}
