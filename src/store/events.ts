import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type IState = {
  activeFilter: string
}

interface IActions {
  actions: {
    setActiveFilter: (filterBy: string) => void
  }
}

export const useEventsStore = create<IState & IActions>()(
  immer((set) => ({
    // --- STATE ---
    activeFilter: '*',

    actions: {
      setActiveFilter: (filterBy: string) =>
        set((state: IState) => {
          state.activeFilter = filterBy
        }),
      resetState: () =>
        set((state: IState) => {
          state.activeFilter = '*'
        })
    }
  }))
)
