import { create } from "zustand";

interface Store {
  //signup
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

const useStepper = create<Store>((set) => ({
  //signup
  currentStep: 1,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useStepper;
