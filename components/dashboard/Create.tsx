"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { OnlyContestsType } from '@utils/types';
import { useSession } from 'next-auth/react';

const Create = () => {
  const { data: session, status } = useSession()
  const contestID = `${Date.now()}`
  const [allContests, setAllContests] = useState<OnlyContestsType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') return
      if (!session) return

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api/getAllContestsByUser`, {
        method: 'POST',
        body: JSON.stringify({ userID: session.user.id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          setAllContests(() => data as OnlyContestsType[])
        })
        .catch(err => {
          console.log(err)
          fetchData()
        })
    }

    fetchData()
  }, [session])

  useEffect(() => console.log(allContests), [allContests])

  return (
    <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Create Contest</div>

        <Link href={`/code/create/${contestID}/description`} className='bg-white text-red-500 text-center font-bold py-1 w-[90%] mt-1 mb-3'>
          New Contest
        </Link>

        <div className='w-full'>
          <div className='font-bold px-1 text-xl text-center'>Your Contests</div>
          <div className='bg-red-500 w-full flex flex-col'>
            {
              allContests.length > 0 &&
              allContests.map((contest: OnlyContestsType, idx: number) => {
                return (
                  <div key={idx} className='w-full'>
                    <EditContest contest={contest} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const EditContest = ({ contest }: { contest: OnlyContestsType }) => {
  function timeDifference(dt2: Date, dt1: Date): string {
    const diff = dt2.getTime() - dt1.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = (diff % (1000 * 60 * 60)) / (1000 * 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}h`;
  }

  return (
    <Link href={`/code/create/${contest.contestID}/description`} className={`group w-full p-1 flex justify-between items-center hover:text-red-500 hover:bg-white border-y border-slate-300`} >
      <div className='w-full'>
        <div className='font-bold'>
          {contest.contestName}
        </div>
        <div>
          {String(new Date(contest.startTime).toLocaleDateString())} |
          {' ' + String(new Date(contest.startTime).toLocaleTimeString())} |
          {' ' + timeDifference(new Date(contest.endTime), new Date(contest.startTime))}
        </div>
      </div>

      <div className='w-20 text-right'>
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Create
