import { create } from "zustand";

interface IMagicData {
  email: string;
  key: string;
  sent: boolean;
}

interface AuthStore {
  magicData?: IMagicData | null;
  setMagicData: (data: IMagicData | null) => void;
}

const useAuth = create<AuthStore>((set) => ({
  magicData: null,
  setMagicData: (data: IMagicData | null) => set({ magicData: data }),
}));

export default useAuth;
