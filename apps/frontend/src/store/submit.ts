import type { SubmitType } from '../types/submit';
import { create } from 'zustand';

interface SubmitTypeStore {
  type: SubmitType;
  setType: (newType: SubmitType) => void;
}

export const useSubmitTypeStore = create<SubmitTypeStore>((set) => ({
  type: "idle", // initial type value
  setType: (newType) => set({ type: newType }), // updates the type state
}));
