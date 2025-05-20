import { create } from 'zustand'

interface BearState {
  status: boolean
  toggleStatus: () => void
}

const useSharePopupStore = create<BearState>((set) => ({
  status: false,
  toggleStatus: () => set((state) => ({ status: !state.status })),
}))

export default useSharePopupStore
