import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface invitePageProps {
  params: {
    inviteCode: string;
  };
}
const Invite = async ({ params: { inviteCode } }: invitePageProps) => {
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;
  if (!inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const updatedServer = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (updatedServer) return redirect(`/servers/${updatedServer.id}`);

  return null;
};

export default Invite;
