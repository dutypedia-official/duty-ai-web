import { create } from "zustand";

interface Store {
  selectedFile: File | null;
  fileArray: File[];
  setSelectedFile: (file: File | null) => void;
  addFileToArray: (file: File | null) => void;
  removeFileFromArray: (file: File) => void;
}

const useFileInputStore = create<Store>((set) => ({
  selectedFile: null,
  fileArray: [],
  setSelectedFile: (file) => set({ selectedFile: file }),
  addFileToArray: (file) => {
    if (file !== null && file !== undefined) {
      set((state) => ({ fileArray: [...state.fileArray, file] }));
    }
  },
  removeFileFromArray: (fileToRemove) => {
    set((state) => ({
      fileArray: state.fileArray.filter((file) => file !== fileToRemove),
    }));
  },
}));

export default useFileInputStore;
