import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { ChanelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";

interface serverSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<serverSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChanel = server?.channels?.filter(
    (chan) => chan.type === ChanelType.TEXT
  );
  const audioChanel = server?.channels?.filter(
    (chan) => chan.type === ChanelType.AUDIO
  );
  const videoChanel = server?.channels?.filter(
    (chan) => chan.type === ChanelType.VIDEO
  );

  const members = server.members.filter((mem) => mem.profileId! == profile.id);
  const role =
    server.members.find((mem) => mem.profileId === profile.id)?.role ?? "GUEST";

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
