import { create } from "zustand";

interface Store {
  current: number;
  next: () => void;
  prev: () => void;
  setCurrent: (state: number) => void;
}

const useScenarioForm = create<Store>((set) => ({
  current: 1,
  next: () => set((state) => ({ current: state.current + 1 })),
  prev: () => set((state) => ({ current: state.current - 1 })),
  setCurrent: (state) => set({ current: state }),
}));

export default useScenarioForm;
