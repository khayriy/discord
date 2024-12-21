import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
  
) {
  try {
    const { id } = await params;

    if (!id)
      return new NextResponse("unauthorized", {
        status: 401,
        statusText: "You Are Not Authorized",
      });
    const profile = await currentProfile();
    if (!profile)
      return new NextResponse("unauthorized", {
        status: 401,
        statusText: "You Are Not Authorized",
      });

    const response = await db.server.update({
      where: {
        id: id,
        profileId : profile.id ,
      
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({ data: response });
  } catch (err) {
    console.log(err, "iam err");
    return new NextResponse("Refresh Error", {
      status: 500,
      statusText: "Refresh Invite Code Error",
    });
  }
}
