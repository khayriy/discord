import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-state";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteServerModel = () => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type == "deleteServer";

  const deleteServerHandler = async () => {
    try{
        setIsLoading(true)
         await axios.delete(`/api/servers/${data?.server?.id}/delete` )    
         onClose()
         router.refresh() 
        
         router.push('/')
    }
    catch(err) {

    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Delete '{data?.server?.name}' ?
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            A You Sure About Deleting Server{" "}
            <span className="font-semibold text-indigo-500">
              {data?.server?.name}?
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={ ()=> deleteServerHandler()}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModel;
