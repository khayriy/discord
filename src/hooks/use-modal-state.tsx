import { create } from "zustand";

export type ModalType = "createServer";

interface modalStoreInterface {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<modalStoreInterface>((set) => {
  return {
    type: null,
    isOpen: false,
    onOpen(type) {
      set({ isOpen: true, type });
    },
    onClose() {
      set({ isOpen: false, type: null });
    },
  };
});
