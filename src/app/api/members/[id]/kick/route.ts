import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");
  const id = await params.id;

  try {
    const profile = await currentProfile();
    if (!profile)
      return new NextResponse("unauthorized", {
        status: 401,
        statusText: "unauthorized",
      });
    if (!serverId)
      return new NextResponse("must provide information", {
        status: 400,
        statusText: "Must Provide Server Id",
      });
    const updatedServer = await db.server.update({
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          delete: {
            id,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
    });
    if (!updatedServer)
      return new NextResponse("No Server Match", {
        status: 404,
        statusText: "No Server Match",
      });
    return NextResponse.json({ data: updatedServer });
  } catch (err) {
    console.log(err, "iam update member role error");
    return new NextResponse("server Error", {
      status: 500,
      statusText: "some errors here",
    });
  }
}
