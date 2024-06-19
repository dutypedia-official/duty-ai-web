import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  activeSubscription: any;
  setActiveSubscription: (val: any) => void;
  manageUrl: string;
  setManageUrl: (val: string) => void;
}

const useSubscription = create<Store>()(
  persist(
    (set) => ({
      activeSubscription: null,
      setActiveSubscription: (val) => set({ activeSubscription: val }),
      manageUrl: "",
      setManageUrl: (val) => set({ manageUrl: val }),
    }),
    {
      name: "ui-storage",
    }
  )
);

export default useSubscription;
