import { create } from "zustand";

interface NavStore {
  isShowNav: boolean;
  openNav: () => void;
  closeNav: () => void;
}

const useNav = create<NavStore>((set) => ({
  isShowNav: true,
  openNav: () => set({ isShowNav: true }),
  closeNav: () => set({ isShowNav: false }),
}));

export default useNav;