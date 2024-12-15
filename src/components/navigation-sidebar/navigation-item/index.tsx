"use client"

import ActionTooltip from "@/components/ui/action-tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

interface NavigationItemProps {
    id : string , 
    imageUrl : string ,
    name : string 
}
const NavigationItem = ({id , imageUrl , name} : NavigationItemProps) => {
    const params = useParams() 
    const router = useRouter()
  return (
    <ActionTooltip side="right" align="center" label={name}>
        <button className="group relative flex items-center" onClick={()=> router.push(`/servers/${id}`)}>
            <div className={cn('absolute left-0 bg-primary rounded-r-full transition-all w-[4px]' , 
                params?.serverId !== id &&  'group-hover:h-[20px]'  , 
                params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
            )} />
              
            <div className={cn('relative group flex mx-3 h-12 w-12 rounded-[48px] group-hover:rounded-[16px] transition-all overflow-hidden' , 
                params?.serverId === id && 'bg-primary/10 text-primary rounded-[16px]'
            )}>
                <Image fill src={imageUrl} alt="chanel" />
            </div>
        </button>
    </ActionTooltip>
  )
}

export default NavigationItem