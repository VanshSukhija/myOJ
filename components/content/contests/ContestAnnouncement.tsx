"use client";
import { UserType } from '@utils/types';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import ContestHeader from '@components/content/contests/ContestHeader';
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useSession } from 'next-auth/react';
import ContestParticipants from './ContestParticipants';
import { SelectedContestContext } from '@app/code/contests/layout';
import Link from 'next/link';

const ContestDescription = () => {
  const { selectedContest, setSelectedContest } = useContext(SelectedContestContext)
  const [participants, setParticipants] = useState<UserType[] | null>(null)
  const params = useParams()
  const { data: session, status } = useSession();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [isShowingParticipants, setIsShowingParticipants] = useState<boolean>(false)

  useEffect(() => {
    const fetchContest = async () => {
      if (params.contestID === undefined) return
      if (status === 'loading') return
      if (!session) return

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api/getAllContests`, {
          method: 'POST',
          body: JSON.stringify({ contestID: params.contestID })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
          
        setSelectedContest(() => data.contestDetails)
        data.participants && setParticipants(data.participants)
        data.participants && setIsRegistered(data.participants.some((participant: any) => participant.id === session.user.id))
      } catch (err) {
        console.log(err)
        fetchContest()
      }
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
    participants && setParticipants([...participants, { ...session.user, isAdmin: false }])
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
    participants && setParticipants(participants.filter(participant => participant.id !== session.user.id))
  }

  return (
    selectedContest &&
    <div>
      <ContestHeader contest={selectedContest} />

      <div className='w-full h-full'>
        <div
          dangerouslySetInnerHTML={{ __html: selectedContest.contestDescription }}
          className='ql-editor'
        />
      </div>

      <div className='w-full py-2 flex flex-col justify-center items-center gap-2'>
        {
          new Date(selectedContest.startTime) < new Date() ?
            (isRegistered === true || new Date(selectedContest.endTime) < new Date()) ?
              <Link
                href={`/code/contests/${selectedContest.contestID}/problems`}
                className='bg-pink-600 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-600 w-1/6 text-center'
              >
                Go To Contest
              </Link> :
              <div className='border-2 border-pink-600 px-3 py-2'>
                Contest is running. You are not registered.
              </div>
            :
            new Date(selectedContest.registrationTime) < new Date() ?
              isRegistered === null ?
                <div>Loading...</div>
                :
                isRegistered === false ?
                  <div
                    className='bg-pink-600 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-600 w-1/6 text-center'
                    onClick={registerUserToContest}
                  >
                    Register :)
                  </div>
                  :
                  <div
                    className='bg-pink-600 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-600 w-1/6 text-center'
                    onClick={UnegisterUserToContest}
                  >
                    Unregister :(
                  </div>
              :
              <div className='border-2 border-pink-600 px-3 py-2'>
                Registration will start on {new Date(selectedContest.registrationTime).toLocaleString()}.
              </div>
        }
        {
          new Date(selectedContest.registrationTime) < new Date() &&
          <div
            onClick={() => setIsShowingParticipants(prev => !prev)}
            className='bg-pink-600 text-white px-3 py-1 font-bold cursor-pointer hover:bg-white hover:text-pink-600 w-1/6 text-center'
          >
            {isShowingParticipants === true ? 'Hide' : 'Show'} Participants
          </div>
        }
      </div>
      {
        isShowingParticipants === true && participants !== null &&
        <ContestParticipants participants={participants} />
      }
    </div>
  )
}

export default ContestDescription
