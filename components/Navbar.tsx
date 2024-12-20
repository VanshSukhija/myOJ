"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCalendar, faComments, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname().split('/')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/')
  }, [session, status, router])

  return (
    <nav className="text-slate-400 bg-black h-screen w-12 flex flex-col justify-between">
      <ul className="flex flex-col items-center gap-2">
        <Link className='border-l-2 border-cyan-600 w-full text-center' href="/code/problemset"> {/* blue */}
          <FontAwesomeIcon icon={faBrain} className={`text-2xl m-2 cursor-pointer ${pathname[2] === 'problemset' ? 'text-cyan-600' : ''}`} title="Problem Set" />
        </Link>
        <Link className='border-l-2 border-pink-600 w-full text-center' href="/code/contests"> {/* pink */}
          <FontAwesomeIcon icon={faCalendar} className={`text-2xl m-2 cursor-pointer ${pathname[2] === 'contests' ? 'text-pink-600' : ''}`} title="Contests" />
        </Link>
        <Link className='border-l-2 border-purple-500 w-full text-center' href="/code/blogs"> {/* purple */}
          <FontAwesomeIcon icon={faComments} className={`text-2xl m-2 cursor-pointer ${pathname[2] === 'blogs' ? 'text-purple-500' : ''}`} title="Blogs" />
        </Link>
        <Link className='border-l-2 border-red-500 w-full text-center' href="/code/create"> {/* red */}
          <FontAwesomeIcon icon={faPen} className={`text-2xl m-2 cursor-pointer ${pathname[2] === 'create' ? 'text-red-500' : ''}`} title="Create" />
        </Link>
        <Link className='border-l-2 border-green-500 w-full text-center' href={`/code/profile/${session?.user.id}`}> {/* green */}
          {session ?
            <img src={session.user.image} className="w-8 h-8 rounded-full m-2 cursor-pointer border-2 border-green-500" title={session.user.name} /> :
            <FontAwesomeIcon icon={faUser} className={`text-2xl m-2 cursor-pointer ${pathname[2] === 'profile' ? 'text-green-500' : ''}`} title="Profile" />
          }
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
