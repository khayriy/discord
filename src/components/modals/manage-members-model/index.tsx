"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";

import { useModal } from "@/hooks/use-modal-state";
import { serverWithMembers } from "@/types";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const ManageMembersModel = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const { server } = data as { server: serverWithMembers };

  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "manageMembers";

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    setLoadingId(memberId);
    try {
      const response = await axios.patch(
        `/api/members/${memberId}?serverId=${server.id}`,
        { role }
      );
      router.refresh();
     
      onOpen("manageMembers", { server: response.data?.data });
    } catch (err) {
    } finally {
      setLoadingId("");
    }
  };

  const onKickUser = async (memberId : string)=>{
    try{
      setLoadingId(memberId)
      const response = await axios.patch(
        `/api/members/${memberId}/kick?serverId=${server.id}`);
      router.refresh();
     
      onOpen("manageMembers", { server: response.data?.data });
    }
    catch(err) {

    }
    finally {
      setLoadingId("")
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            {server?.members.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-x-2 mb-6 w-full "
              >
                <UserAvatar src={item.profile.imageUrl} />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {item.profile.name}
                    {roleIconMap[item.role]}
                  </div>
                  <p className="text-xs  flex items-center text-zinc-500">
                    {item.profile.email}
                  </p>
                </div>
                {server.profileId !== item.profileId &&
                  loadingId !== item.id && (
                    <div className="ml-auto ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() => onRoleChange(item.id, "GUEST")}
                                  disabled={item.role === "GUEST"}
                                >
                                  <Shield className="mr-2 w-4 h-4" />
                                  Guest
                                  {item.role === "GUEST" && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(item.id, "MODERATOR")
                                  }
                                  disabled={item.role === "MODERATOR"}
                                >
                                  <ShieldCheck className="mr-2 w-4 h-4" />
                                  Moderator
                                  {item.role === "MODERATOR" && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={()=>onKickUser(item.id)}>
                            <Gavel className="mr-2 w-4 h-4" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                {loadingId === item.id && (
                  <Loader2 className="w-4 h-4 text-zinc-400 animate-spin ml-auto" />
                )}
              </div>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModel;
