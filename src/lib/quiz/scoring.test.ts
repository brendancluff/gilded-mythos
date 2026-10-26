import assert from "node:assert/strict";
import { test } from "node:test";

import { quizQuestions } from "./questions";
import { calculateSortingResult } from "./scoring";
import type {
  HouseName,
  QuizResponses,
} from "./types";

function answersFor(
  house: HouseName
): QuizResponses {
  const responses: QuizResponses = {};

  for (const question of quizQuestions) {

const answer =
  question.answers.find(
    (option) => option.houses.includes(house)
  ) ?? question.answers[0];


    if (!answer) {
      throw new Error(
        `No answer for ${house} in Q${question.id}`
      );
    }

    responses[question.id] = answer.id;
  }

  return responses;
}

test("All 18 questions have valid answer mappings", () => {
  assert.equal(quizQuestions.length, 18);

  for (const question of quizQuestions) {
    assert.ok(question.answers.length >= 2);

    for (const answer of question.answers) {
      assert.ok(answer.houses.length >= 1);
    }

    assert.equal(
      question.randomizeAnswers,
      question.id !== 18
    );
  }
});

test("Solara receives a primary House only", () => {
  const result = calculateSortingResult(
    answersFor("Solara")
  );

  assert.equal(result.primaryHouse, "Solara");
  assert.equal(result.secondaryHouse, null);
});

test("Lunaris receives a primary House only", () => {
  const result = calculateSortingResult(
    answersFor("Lunaris")
  );

  assert.equal(result.primaryHouse, "Lunaris");
  assert.equal(result.secondaryHouse, null);
});

test("Atherion receives a primary House only", () => {
  const result = calculateSortingResult(
    answersFor("Atherion")
  );

  assert.equal(result.primaryHouse, "Atherion");
  assert.equal(result.secondaryHouse, null);
});

test("Spiraxus always receives a secondary House", () => {
  const result = calculateSortingResult(
    answersFor("Spiraxus")
  );

  assert.equal(result.primaryHouse, "Spiraxus");
  assert.ok(result.secondaryHouse !== null);
  assert.notEqual(result.secondaryHouse, "Spiraxus");
});

test("Incomplete quiz submissions are rejected", () => {
  const responses = answersFor("Solara");

  delete responses[18];

  assert.throws(
    () => calculateSortingResult(responses),
    /All 18 questions must be answered/
  );
});

test("Invalid answer IDs are rejected", () => {
  const responses = answersFor("Solara");

  responses[1] = "invalid";

  assert.throws(
    () => calculateSortingResult(responses),
    /Invalid answer for question 1/
  );
});


test("Spiraxus wins a first-place tie", () => {
  const responses = answersFor("Spiraxus");

  // Keep Q13 valid, since it has no Spiraxus answer.
  // Set the first eight standard questions to Solara
  // where their answers support Solara.

for (const questionId of [1, 2, 3, 4, 5, 8, 9, 10]) {
  responses[questionId] = "a";
}

responses[13] = "b";




  const result = calculateSortingResult(responses);
  console.log("Tie test House scores:", result.scores);


  const highestScore = Math.max(
    ...Object.values(result.scores)
  );

  assert.equal(
    result.scores.Spiraxus,
    highestScore,
    "Spiraxus must share the highest score."
  );

  assert.ok(
    Object.entries(result.scores).filter(
      ([, score]) => score === highestScore
    ).length > 1,
    "At least two Houses must tie for first."
  );

  assert.equal(result.primaryHouse, "Spiraxus");
  assert.ok(result.secondaryHouse !== null);
});


test("Q3 resolves a tie between non-Spiraxus Houses", () => {
  const responses = answersFor("Solara");

  // Q3 must favor Solara.
  const q3Solara = quizQuestions
    .find((question) => question.id === 3)!
    .answers.find((answer) => answer.houses.includes("Solara"))!;

  responses[3] = q3Solara.id;

  // Find a valid combination that produces a first-place
  // tie between Solara and Lunaris.
  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);
      const highest = Math.max(...Object.values(result.scores));

      if (
        result.scores.Solara === highest &&
        result.scores.Lunaris === highest &&
        result.scores.Spiraxus < highest &&
        result.scores.Atherion < highest
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    if (question.id === 3) {
      return findTie(index + 1);
    }

    // Only explore answers favoring Solara or Lunaris.
    for (const answer of question.answers) {
      if (
        !answer.houses.includes("Solara") &&
        !answer.houses.includes("Lunaris")
      ) {
        continue;
      }

      responses[question.id] = answer.id;

      const found = findTie(index + 1);
      if (found) return found;
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(tiedResponses, "No valid Solara-Lunaris tie found.");

  const result = calculateSortingResult(tiedResponses);

  console.log("Q3 tie-breaker scores:", result.scores);

  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.primaryHouse, "Solara");
});

test("Q5 resolves a tie when Q3 cannot", () => {
  const responses = answersFor("Solara");

  // Q3 favors Atherion, so it cannot resolve
  // a tie between Solara and Lunaris.
  responses[3] = quizQuestions
    .find((question) => question.id === 3)!
    .answers.find((answer) =>
      answer.houses.includes("Atherion")
    )!.id;

  // Q5 favors Lunaris.
  responses[5] = quizQuestions
    .find((question) => question.id === 5)!
    .answers.find((answer) =>
      answer.houses.includes("Lunaris")
    )!.id;

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);
      const highest = Math.max(...Object.values(result.scores));

      if (
        result.scores.Solara === highest &&
        result.scores.Lunaris === highest &&
        result.scores.Atherion < highest &&
        result.scores.Spiraxus < highest
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    // Preserve our Q3 and Q5 choices.
    if (question.id === 3 || question.id === 5) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      if (
        !answer.houses.includes("Solara") &&
        !answer.houses.includes("Lunaris")
      ) {
        continue;
      }

      responses[question.id] = answer.id;

      const found = findTie(index + 1);
      if (found) return found;
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(tiedResponses, "No valid Q5 tie found.");

  const result = calculateSortingResult(tiedResponses);

  console.log("Q5 tie-breaker scores:", result.scores);

  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.primaryHouse, "Lunaris");
});

test("Q12 resolves a tie when Q3 and Q5 cannot", () => {
  const responses = answersFor("Solara");

  // Q3 and Q5 favor Atherion, so neither can
  // resolve a tie between Solara and Lunaris.
  for (const questionId of [3, 5]) {
    const question = quizQuestions.find(
      (item) => item.id === questionId
    )!;

    responses[questionId] = question.answers.find(
      (answer) => answer.houses.includes("Atherion")
    )!.id;
  }

  // Q12 favors Lunaris.
  responses[12] = quizQuestions
    .find((question) => question.id === 12)!
    .answers.find((answer) =>
      answer.houses.includes("Lunaris")
    )!.id;

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);
      const highest = Math.max(...Object.values(result.scores));

      if (
        result.scores.Solara === highest &&
        result.scores.Lunaris === highest &&
        result.scores.Atherion < highest &&
        result.scores.Spiraxus < highest
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    // Keep Q3, Q5, and Q12 fixed.
    if ([3, 5, 12].includes(question.id)) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      if (
        !answer.houses.includes("Solara") &&
        !answer.houses.includes("Lunaris")
      ) {
        continue;
      }

      responses[question.id] = answer.id;

      const found = findTie(index + 1);
      if (found) return found;
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(tiedResponses, "No valid Q12 tie found.");

  const result = calculateSortingResult(tiedResponses);

  console.log("Q12 tie-breaker scores:", result.scores);

  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.primaryHouse, "Lunaris");
});

test("Q10 resolves a tie when Q3, Q5, and Q12 cannot", () => {
  const responses = answersFor("Solara");

  // These three questions favor Atherion, so they
  // cannot resolve a Solara-Lunaris tie.
  for (const questionId of [3, 5, 12]) {
    const question = quizQuestions.find(
      (item) => item.id === questionId
    )!;

    responses[questionId] = question.answers.find(
      (answer) => answer.houses.includes("Atherion")
    )!.id;
  }

  // Q10 favors Lunaris.
  responses[10] = quizQuestions
    .find((question) => question.id === 10)!
    .answers.find((answer) =>
      answer.houses.includes("Lunaris")
    )!.id;

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);
      const highest = Math.max(...Object.values(result.scores));

      if (
        result.scores.Solara === highest &&
        result.scores.Lunaris === highest &&
        result.scores.Atherion < highest &&
        result.scores.Spiraxus < highest
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    // Preserve the four tie-breaker answers.
    if ([3, 5, 12, 10].includes(question.id)) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      if (
        !answer.houses.includes("Solara") &&
        !answer.houses.includes("Lunaris")
      ) {
        continue;
      }

      responses[question.id] = answer.id;

      const found = findTie(index + 1);
      if (found) return found;
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(tiedResponses, "No valid Q10 tie found.");

  const result = calculateSortingResult(tiedResponses);

  console.log("Q10 tie-breaker scores:", result.scores);

  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.primaryHouse, "Lunaris");
});

test("Emergency fallback resolves a tie when all tie-breakers fail", () => {
  const responses = answersFor("Solara");

  // All four tie-breakers favor Atherion,
  // so none can resolve a Solara-Lunaris tie.
  for (const questionId of [3, 5, 12, 10]) {
    const question = quizQuestions.find(
      (item) => item.id === questionId
    )!;

    responses[questionId] = question.answers.find(
      (answer) => answer.houses.includes("Atherion")
    )!.id;
  }

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);
      const highest = Math.max(...Object.values(result.scores));

      if (
        result.scores.Solara === highest &&
        result.scores.Lunaris === highest &&
        result.scores.Atherion < highest &&
        result.scores.Spiraxus < highest
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    if ([3, 5, 12, 10].includes(question.id)) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      if (
        !answer.houses.includes("Solara") &&
        !answer.houses.includes("Lunaris")
      ) {
        continue;
      }

      responses[question.id] = answer.id;

      const found = findTie(index + 1);
      if (found) return found;
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(
    tiedResponses,
    "No valid emergency fallback tie found."
  );

  const result = calculateSortingResult(tiedResponses);

  console.log("Emergency fallback scores:", result.scores);

  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.primaryHouse, "Solara");
  assert.equal(result.secondaryHouse, null);
});

test("Spiraxus receives the highest-scoring secondary House", () => {
  const responses = answersFor("Spiraxus");

  // Reuse our verified first-place tie scenario.
  for (const questionId of [1, 2, 3, 4, 5, 8, 9, 10]) {
    responses[questionId] = "a";
  }

  responses[13] = "b";

  const result = calculateSortingResult(responses);

  // Confirm the expected score distribution.
  assert.deepEqual(result.scores, {
    Solara: 9,
    Lunaris: 2,
    Atherion: 3,
    Spiraxus: 9,
  });

  // Spiraxus wins the primary assignment.
  assert.equal(result.primaryHouse, "Spiraxus");

  // Solara is the highest-scoring non-Spiraxus House.
  assert.equal(result.secondaryHouse, "Solara");
});

test("Q3 resolves a tie for Spiraxus secondary House", () => {
  const responses = answersFor("Spiraxus");

  // Q3 favors Solara.
  responses[3] = quizQuestions
    .find((question) => question.id === 3)!
    .answers.find((answer) =>
      answer.houses.includes("Solara")
    )!.id;

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);

      if (
        result.primaryHouse === "Spiraxus" &&
        result.scores.Solara === result.scores.Lunaris &&
        result.scores.Solara > result.scores.Atherion
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    if (question.id === 3) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      responses[question.id] = answer.id;

      const found = findTie(index + 1);

      if (found) {
        return found;
      }
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(
    tiedResponses,
    "No valid Spiraxus secondary-House tie found."
  );

  const result = calculateSortingResult(tiedResponses);

  console.log("Spiraxus secondary tie scores:", result.scores);

  assert.equal(result.primaryHouse, "Spiraxus");
  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.equal(result.secondaryHouse, "Solara");
});

test("Emergency fallback resolves a Spiraxus secondary House tie", () => {
  const responses = answersFor("Spiraxus");

  // None of these questions can distinguish
  // between Solara and Lunaris.
  for (const questionId of [3, 5, 12, 10]) {
    const question = quizQuestions.find(
      (item) => item.id === questionId
    )!;

    responses[questionId] = question.answers.find(
      (answer) => answer.houses.includes("Atherion")
    )!.id;
  }

  function findTie(index: number): QuizResponses | null {
    if (index === quizQuestions.length) {
      const result = calculateSortingResult(responses);

      if (
        result.primaryHouse === "Spiraxus" &&
        result.scores.Solara === result.scores.Lunaris &&
        result.scores.Solara > result.scores.Atherion
      ) {
        return { ...responses };
      }

      return null;
    }

    const question = quizQuestions[index];

    if ([3, 5, 12, 10].includes(question.id)) {
      return findTie(index + 1);
    }

    for (const answer of question.answers) {
      responses[question.id] = answer.id;

      const found = findTie(index + 1);

      if (found) {
        return found;
      }
    }

    return null;
  }

  const tiedResponses = findTie(0);

  assert.ok(
    tiedResponses,
    "No valid Spiraxus secondary fallback tie found."
  );

  const result = calculateSortingResult(tiedResponses);

  console.log("Secondary fallback scores:", result.scores);

  assert.equal(result.primaryHouse, "Spiraxus");
  assert.equal(result.scores.Solara, result.scores.Lunaris);
  assert.ok(result.scores.Solara > result.scores.Atherion);
  assert.equal(result.secondaryHouse, "Solara");
});
