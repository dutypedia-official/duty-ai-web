import { create } from "zustand";

interface DashboardStore {
  showMobileSidebar: boolean;
  setShowMobileSidebar: (showMobileSidebar: boolean) => void;
}

const useDashboard = create<DashboardStore>((set, get) => ({
  showMobileSidebar: false,
  setShowMobileSidebar: (showMobileSidebar) => set({ showMobileSidebar }),
}));

export default useDashboard;
