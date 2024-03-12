import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='p-2'>
      <Link href={`/auth/signin`} className='bg-black text-white font-bold px-3 py-2 rounded-md'>Login</Link>
    </div>
  )
}

export default page
