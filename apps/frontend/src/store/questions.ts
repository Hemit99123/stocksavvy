import type { TopicName } from '../types/question';
import { create } from 'zustand';

interface QuestionTypeStore {
  type: TopicName;
  setType: (newType: TopicName) => void;
}

export const useQuestionTypeStore = create<QuestionTypeStore>((set) => ({
  type: "None", // initial type value
  setType: (newType) => set({ type: newType }), // updates the type state
}));
