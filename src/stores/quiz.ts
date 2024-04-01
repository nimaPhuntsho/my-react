import { questions } from "./../data/questions";
import { create } from "zustand";
import { Question } from "../components/Question";

export interface QuizAnswer extends Question {
  userAnswer: string;
  hasAnswered: boolean;
}

export interface QuizStore {
  items: QuizAnswer[];
  add: (question: QuizAnswer) => void;
}

export const useQuiz = create<QuizStore>()((set) => ({
  items: [],
  add: (answer) =>
    set((state) => ({
      items: [...state.items, answer],
    })),
}));
