import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const serverId = await params.id
  
  try {
    if (!serverId)
      return new NextResponse("must provide information", {
        status: 400,
        statusText: "Must Provide Server Id",
      });
    const profile = await currentProfile();
    if (!profile)
      return new NextResponse("unauthorized", {
        status: 401,
        statusText: "unauthorized",
      });
   
    const updatedServer = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
    if(!updatedServer) return new NextResponse("server Error", {
      status: 500,
      statusText: "some errors here",
    });
    return NextResponse.json({ data: updatedServer });
  } catch (err) {
    return new NextResponse("server Error", {
      status: 500,
      statusText: "some errors here",
    });
  }
}
