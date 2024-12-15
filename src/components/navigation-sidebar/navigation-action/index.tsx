"use client"
import ActionTooltip from '@/components/ui/action-tooltip'
import { useModal } from '@/hooks/use-modal-state'
import { Plus } from 'lucide-react'
import React from 'react'

const NavigationAction = () => {
  const {onOpen} = useModal()
  return (
    <div>
        <ActionTooltip label='Create Server' align='center' side='right'>
        <button className='group flex items-center' onClick={()=>onOpen('createServer')}>
            <div className='flex mx-3 w-12 h-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center
            justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500
            '>
                <Plus className='group-hover:text-white transition text-emerald-500' size={25}/>
            </div>
        </button>
        </ActionTooltip>
      
    </div>
  )
}

export default NavigationAction