"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-state";

const ManageMembersModel = () => {
  const { isOpen, type, onClose, data } = useModal();
  const server = data?.server;

  const isModalOpen = isOpen && type === "manageMembers";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite friends
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Make You Friends Close
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">Hello World</div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModel;
