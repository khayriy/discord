"use client";
import { useEffect, useState } from "react";
import ServerModal from "../modals/server-modal/server-modal";
import InviteModal from "../modals/invite-modal";
import EditServerModel from "../modals/edit-server-model";
import ManageMembersModel from "../modals/manage-members-model";
import CreateChannelModel from "../modals/create-channel-model";
import LeaveServerModel from "../modals/leave-server-model";

import DeleteServerModel from '../modals/delete-server-model'

export const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ServerModal />
      <InviteModal />
      <EditServerModel />
      <ManageMembersModel />
      <CreateChannelModel />
      <LeaveServerModel />
      <DeleteServerModel />
    </>
  );
};
