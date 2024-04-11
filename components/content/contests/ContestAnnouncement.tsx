"use client";
import { OnlyContestsType } from '@utils/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ContestHeader from '@components/content/contests/ContestHeader';
import katex from 'katex'
import 'katex/dist/katex.min.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ContestDescription = () => {
  const [contest, setContest] = useState<OnlyContestsType | null>(null)
  const params = useParams()
  const { data: session, status } = useSession();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchContest = async () => {
      if (status === 'loading') return
      if (!session) return

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api/getAllContests`, {
        method: 'POST',
        body: JSON.stringify({ contestID: params.contestID, userID: session.user.id })
      })
      const data = await res.json()
      console.log(data)
      setContest(() => data.length > 0 && data[0].length > 0 ? data[0][0] : null)
      setIsRegistered(() => data.length > 1 && data[1].length > 0 ? (data[1][0].participantCount > 0 ? true : false) : null)
    }

    fetchContest()
  }, [params.contestID, session, status])

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  const registerUserToContest = async () => {
    if (status === 'loading') return
    if (!session) return

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/${params.contestID}/announcement/api`, {
      method: 'POST',
      body: JSON.stringify({ contestID: params.contestID, userID: session.user.id })
    })
    const data = await res.json()
    setIsRegistered(() => true)
  }

  const UnegisterUserToContest = async () => {
    if (status === 'loading') return
    if (!session) return

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/${params.contestID}/announcement/api`, {
      method: 'DELETE',
      body: JSON.stringify({ contestID: params.contestID, userID: session.user.id })
    })
    const data = await res.json()
    setIsRegistered(() => false)
  }

  return (
    contest &&
    <div>
      <ContestHeader contest={contest} />

      <div className='w-full h-full px-3 py-2 overflow-auto'>
        <div
          dangerouslySetInnerHTML={{ __html: contest.contestDescription }}
          className='h-fit min-h-full'
        />
      </div>

      <div className='w-full py-2 flex justify-center items-center'>
        {
          new Date(contest.startTime) < new Date() ?
            <Link
              href={`/contests/${contest.contestID}/problems`}
              className='bg-pink-500 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-500 w-1/6 text-center'
            >
              Go To Contest
            </Link> :
            new Date(contest.registrationTime) < new Date() ?
              isRegistered === null ?
                <div>Loading...</div> :
                isRegistered === false ?
                  <div
                    className='bg-pink-500 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-500 w-1/6 text-center'
                    onClick={registerUserToContest}
                  >
                    Register
                  </div> :
                  <div
                    className='bg-pink-500 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-500 w-1/6 text-center'
                    onClick={UnegisterUserToContest}
                  >
                    Unregister
                  </div> :
              <div className='border-2 border-pink-500 px-3 py-2'>
                Registration will start on {new Date(contest.registrationTime).toLocaleString()}
              </div>
        }
      </div>
    </div>
  )
}

export default ContestDescription
