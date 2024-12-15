import InitialModal from "@/components/modals/initial-modal/initial-modal";
import { db } from "@/lib/db";
import { initailProfile } from "@/lib/initail-profile";
import { redirect } from "next/navigation";
import React from "react";

const Setup = async () => {
  
  const profile = await initailProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },

  });
  
  console.log(profile , 'hi iam profile')

  if (server) return redirect(`/servers/${server.id}`);
  return (
   <InitialModal />
  );
};

export default Setup;
