"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import mailIcon from '@public/icons8-mail-50.png'
import Image from 'next/image'
import { faAngleRight, faBoltLightning, faBrain, faCalendar, faPen, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { DisplayUserType } from '@utils/types'
import { signOut, useSession } from 'next-auth/react'

const Profile = () => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const tab = pathname.split('/')[4]
  const { data: session } = useSession()
  const [user, setUser] = useState<DisplayUserType | null>(null)

  useEffect(() => {
    const fetchUser = async (retry: number) => {
      if (retry === 0) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: params.userID })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setUser(data.results[0])
      } catch (err) {
        fetchUser(retry - 1)
        console.log(err)
      }
    }

    fetchUser(3)
  }, [params.userID, pathname])

  const deleteAccount = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/api`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: params.userID })
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const logoutAccount = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className='flex flex-col h-screen justify-between items-center bg-green-900 py-2'>
      <div className='w-full'>
        <div className='w-full flex flex-col items-center pb-3 gap-1'>
          <Link href={`/code/profile/${params.userID}`}>
            <img src={user?.image} className='w-40 h-40' />
          </Link>
          <div className='text-center text-normal'>
            <div className='text-2xl font-bold'>{user?.name || '-'}</div>
            <div className='flex items-center gap-2 py-1'>
              <Image src={mailIcon} alt='mail' width={20} height={20} />
              {user?.email}
            </div>
            <div className='w-full py-1 flex justify-evenly'>
              <div className='flex items-center gap-1 h-full' title='Contribution'>
                <FontAwesomeIcon icon={faStar} width={20} height={20} />
                {user?.contribution || 0}
              </div>
              <div className='flex items-center gap-1 h-full' title='Rating'>
                <FontAwesomeIcon icon={faBoltLightning} width={20} height={20} />
                {user?.rating || 0}
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col bg-green-500'>
          <Link
            href={`/code/profile/${params.userID}/search`}
            className={`w-full flex justify-between items-center p-2 hover:text-green-500 hover:bg-white ${tab === 'search' ? 'bg-white text-green-500' : ''}`}
          >
            <div className='w-[90%] flex gap-1 items-center justify-start'>
              <FontAwesomeIcon icon={faSearch} width={20} height={20} />
              Search User
            </div>
            <FontAwesomeIcon icon={faAngleRight} width={20} height={20} />
          </Link>

          <Link
            href={`/code/profile/${params.userID}/submissions`}
            className={`w-full flex justify-between items-center p-2 hover:text-green-500 hover:bg-white ${tab === 'submissions' ? 'bg-white text-green-500' : ''}`}
          >
            <div className='w-[90%] flex gap-1 items-center justify-start'>
              <FontAwesomeIcon icon={faBrain} width={20} height={20} />
              Latest Submissions
            </div>
            <FontAwesomeIcon icon={faAngleRight} width={20} height={20} />
          </Link>

          <Link
            href={`/code/profile/${params.userID}/blogs`}
            className={`w-full flex justify-between items-center p-2 hover:text-green-500 hover:bg-white ${tab === 'blogs' ? 'bg-white text-green-500' : ''}`}
          >
            <div className='w-[90%] flex gap-1 items-center justify-start'>
              <FontAwesomeIcon icon={faPen} width={20} height={20} />
              Blogs & Comments
            </div>
            <FontAwesomeIcon icon={faAngleRight} width={20} height={20} />
          </Link>

          <Link
            href={`/code/profile/${params.userID}/contests`}
            className={`w-full flex justify-between items-center p-2 hover:text-green-500 hover:bg-white ${tab === 'contests' ? 'bg-white text-green-500' : ''}`}
          >
            <div className='w-[90%] flex gap-1 items-center justify-start'>
              <FontAwesomeIcon icon={faCalendar} width={20} height={20} />
              Contests Authored
            </div>
            <FontAwesomeIcon icon={faAngleRight} width={20} height={20} />
          </Link>
        </div>
      </div>

      {
        session && session.user.id === params.userID &&
        <div className='w-full px-2 flex gap-2 items-center justify-center'>
          <button
            className='bg-white text-red-500 font-bold py-1 w-1/2'
            onClick={logoutAccount}
          >
            Logout
          </button>
          <button
            className='bg-red-500 text-white font-bold py-1 w-1/2'
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>
      }
    </div>
  )
}

export default Profile
