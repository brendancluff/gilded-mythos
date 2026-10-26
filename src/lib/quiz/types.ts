
export type HouseName =
  | "Solara"
  | "Lunaris"
  | "Atherion"
  | "Spiraxus";

export type QuizAnswer = {
  id: string;
  text: string;
  houses: HouseName[];
};

export type QuizQuestion = {
  id: number;
  question: string;
  answers: QuizAnswer[];
  randomizeAnswers: boolean;
};

export type QuizResponses = Record<number, string>;

export type HouseScores = Record<HouseName, number>;

export type SortingResult = {
  primaryHouse: HouseName;
  secondaryHouse: HouseName | null;
  scores: HouseScores;
};
