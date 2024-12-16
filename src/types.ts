import { member, profile, server } from "@prisma/client";

export  type serverWithMembers = server & {
    members : (member & {
        profile : profile
    }) []
}