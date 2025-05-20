import { create } from 'zustand';

interface CommentTypeStore {
  showComment: boolean;
  setShowComment: (showComment: boolean) => void;
}

export const useShowCommentStore = create<CommentTypeStore>((set) => ({
  showComment:false, // initial type value
  setShowComment: (showComment) => set({ showComment }), // updates the type state
}));
