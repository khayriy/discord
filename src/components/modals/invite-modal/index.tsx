"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useModal } from "@/hooks/use-modal-state";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";

const InviteModal = () => {

  const [copied , setIsCopied] = useState(false) 
  const [isLoading , setIsLoading] = useState(false)

  const { isOpen, type, onClose, data , onOpen } = useModal();
  const server = data?.server;

  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${server?.inviteCode ?? ""}`;


  const onCopy = ()=>{
    navigator.clipboard.writeText(inviteUrl)
    setIsCopied(true)  

    setTimeout(()=>{
      setIsCopied(false)
    } , 1000)
  }

  const generateNewInviteCodeHandler = async()=>{ 
    
    try{
      setIsLoading(true)

      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
      console.log(response , 'iam front response')
      onOpen('invite' , {server : response.data?.data})
    }
    catch(err) {

    }
    finally {
      setIsLoading(false)
    }

  }
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
        <div className="p-6">
          <Label className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 ">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
            disabled={isLoading}
              value={inviteUrl}
              readOnly
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
            ></Input>

            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ?  <Check  className="w-4 h-4" /> :  <Copy  className="w-4 h-4" />}
            </Button>
          </div>
          <Button
          disabled={isLoading}
            onClick={generateNewInviteCodeHandler}
            size="sm"
            variant="link"
            className="text-xs mt-4 text-zinc-500"
          >
            Generate New Link
            <RefreshCcw className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
