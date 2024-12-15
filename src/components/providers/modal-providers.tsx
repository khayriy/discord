"use client"
import { useEffect, useState } from "react"
import ServerModal from "../modals/server-modal/server-modal"

 
 

export const ModalProviders = ()=>{

    const [isMounted , setIsMounted] = useState(false) 
    useEffect(()=>{
        setIsMounted(true)
    } , [])

    if(!isMounted) return null

    return (
        <ServerModal />
    )
}