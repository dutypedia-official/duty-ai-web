import { create } from "zustand";

interface ChatStore {
  marketData: any;
  setMarketData: (marketData: any) => void;
  favorites: any;
  setFavorites: (favorites: any) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  perPage: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  hasMore: boolean;
  setHasMore: (val: boolean) => void;
}

const useStockData = create<ChatStore>((set, get) => ({
  marketData: [],
  setMarketData: (marketData) => set({ marketData }),
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  isLoading: true,
  setIsLoading: (val) => set({ isLoading: val }),
  perPage: 50,
  currentPage: 1,
  setCurrentPage: (val) => set({ currentPage: val }),
  hasMore: true,
  setHasMore: (val) => set({ hasMore: val }),
}));

export default useStockData;
