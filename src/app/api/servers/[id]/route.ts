import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    console.log(data , 'hi data from the server')
    if (!data.imageUrl || !data.name)
      return new NextResponse("Missing Data", {
        status: 401,
        statusText: "server Error",
      });
    const profile = await currentProfile();
    if (!profile)
      return new NextResponse("UnaAuthorized", {
        status: 401,
        statusText: "server Error",
      });
    const updatedServer = await db.server.update({
      where: {
        id: params.id,
        profileId: profile.id,
      },
      data: {
        imageUrl: data.imageUrl,
        name: data.name,
      },
    });

    if (updatedServer) {
      return NextResponse.json({ data: updatedServer });
    }
  } catch (err) {
    return new NextResponse("Edit Server Error", {
      status: 500,
      statusText: "server Error",
    });
  }
}
