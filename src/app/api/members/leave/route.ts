import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");

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
        where : {
            id : serverId , 
            profileId : {
                not : profile.id
            }
            , 
            members : {
                some : {
                    profileId : profile.id
                }
            }
        } , 
        data : {
            members : {
                deleteMany : {
                    profileId : profile.id
                }
            }
        }
      })
      console.log(updatedServer , 'iam updated')
      return NextResponse.json({data : updatedServer})

  } catch (err) {
    
    return new NextResponse("server Error", {
      status: 500,
      statusText: "some errors here",
    });
  }
}
