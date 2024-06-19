import { create } from "zustand";

interface Store {
  activeTab: any;
  setActiveTab: (val: any) => void;
}

const useGuide = create<Store>((set, get) => ({
  activeTab: 0,
  setActiveTab: (val) => set({ activeTab: val }),
}));

export default useGuide;
