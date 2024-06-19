import { create } from "zustand";

interface ChatStore {
  q: string;
  setQ: (val: string) => void;
}

const useHistory = create<ChatStore>((set, get) => ({
  q: "",
  setQ: (val) => set({ q: val }),
}));

export default useHistory;
