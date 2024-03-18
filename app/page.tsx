"use client"
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/code/home')
  }

  const handleSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: '/code/home' })
  }

  return (
    <div className='p-2'>
      <div className='w-fit bg-black text-white font-bold px-3 py-2 rounded-md cursor-pointer' onClick={async () => await handleSignIn('google')}>
        Login With Google
      </div>

      <div className='w-fit bg-black text-white font-bold px-3 py-2 rounded-md cursor-pointer mt-5' onClick={async () => await handleSignIn('github')}>
        Login With GitHub
      </div>
    </div>
  )
}

export default page
