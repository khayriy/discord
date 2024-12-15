"use client"
import { useTheme } from 'next-themes'
import React from 'react'

const ServerId = () => {
  const {theme , setTheme} = useTheme()
  return (
    <>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </>
   
  )
}

export default ServerId