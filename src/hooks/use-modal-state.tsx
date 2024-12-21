import { server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | 'invite' | 'editServer';


interface modalData { 
  server? : server
}

interface modalStoreInterface {
  type: ModalType | null;
  isOpen: boolean;
  data? : modalData ,
  onOpen: (type: ModalType , data? : modalData) => void;
  onClose: () => void;
}

export const useModal = create<modalStoreInterface>((set) => {
  return {
    type: null,
    isOpen: false,
    data : {} , 
    onOpen(type , data = {} ) {
      set({ isOpen: true, type , data});
    },
    onClose() {
      set({ isOpen: false, type: null });
    },
  };
});
