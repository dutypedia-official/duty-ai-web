import { create } from "zustand";

interface UseKeywordsStore {
  inputValue: string;
  addedItems: string[];
  setInputValue: (value: string) => void;
  setAddedItems: (items: string[]) => void;
  addItem: (item: string) => void;
  removeItem?: (index: number) => void;
}

const useuseKeywords = create<UseKeywordsStore>((set) => ({
  inputValue: "",
  addedItems: [],
  setInputValue: (value) => set({ inputValue: value }),
  setAddedItems: (items) => set({ addedItems: items }),
  addItem: (item) =>
    set((state) => ({ addedItems: [...state.addedItems, item] })),
  removeItem: (index) =>
    set((state) => {
      const newAddedItems = [...state.addedItems];
      newAddedItems.splice(index, 1);
      return { addedItems: newAddedItems };
    }),
}));

export default useuseKeywords;
