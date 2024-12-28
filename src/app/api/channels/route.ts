import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, type } = await req.json();
  const { searchParams } = new URL(req.url);
  const serverId = await searchParams.get("serverId");
  try {
    if (!serverId)
      return new NextResponse("must provide server", { status: 400 });
    if (!name || !type) return new NextResponse("bad request", { status: 400 });
    if(name.trim().toLowerCase() === 'general') return new NextResponse("name cant be 'general'", { status: 400 });
    const profile = await currentProfile();
    if (!profile) return new NextResponse("unauthorized", { status: 401 });

    const newChannel = await db.server.update({
        where : {
            id : serverId , 
           members : {
            some : {
                profileId : profile.id , 
                role : {
                    in : [MemberRole.ADMIN , MemberRole.MODERATOR]
                }
            }
           }
        } , 
        data : {
            channels : {
                create : {
                    name : name , 
                    type : type , 
                    profileId : profile.id
                }
            }
        }

    })

    if(!newChannel) return new NextResponse('create channel error' , {status : 500}) 
     return NextResponse.json({data : newChannel})   
  } catch (err) {
    console.log(err)
    return new NextResponse("Server Error", {
      status: 500,
      statusText: "some thing went wrong",
    });
  }
}
