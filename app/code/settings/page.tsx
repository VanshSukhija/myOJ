"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession()

  return (
    <div className='p-2'>
      <div className='bg-black text-white font-bold px-3 py-2 rounded-md cursor-pointer' onClick={async () => {
        await signOut({ callbackUrl: '/'})
      }}>Logout</div>
    </div>
  )
}

export default page
