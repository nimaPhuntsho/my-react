import { questions } from "./../data/questions";
import { create } from "zustand";
import { Question } from "../components/Question";

export interface QuizAnswer extends Question {
  userAnswer: string;
  answerSelected: boolean;
  hasSubmitted: boolean;
  point: number;
}

export interface QuizStore {
  items: QuizAnswer[];
  add: (question: QuizAnswer) => void;
  reset: () => void;
}

export const useQuiz = create<QuizStore>()((set) => ({
  items: [],
  add: (answer) =>
    set((state) => ({
      items: [...state.items, answer],
    })),

  reset: () => set(() => ({ items: [] })),
}));
