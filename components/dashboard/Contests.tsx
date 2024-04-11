"use client";
import { faAngleRight, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContestWithParticipantsType } from '@utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Contests = () => {
  const [allContests, setAllContests] = useState<ContestWithParticipantsType[]>([])

  useEffect(() => {
    const fetchAllContests = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api/getAllContests`)
      const data = await res.json()
      setAllContests(() => data)
      console.log(data)
    }

    fetchAllContests()
  }, [])

  return (
    <div className='w-full flex h-screen flex-col items-center justify-between bg-pink-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Contests</div>

        <div className='w-full bg-pink-500 flex flex-col'>
          {
            allContests.length > 0 &&
            allContests.filter(contest => new Date(contest.startTime) < new Date() && new Date(contest.endTime) > new Date()).length > 0 &&
            <>
              <div className='font-bold px-1 py-1 text-xl text-center border-t border-slate-300'>
                Ongoing
              </div>
              <div className='bg-pink-500 w-full flex flex-col'>
                {
                  allContests
                    .filter(contest => new Date(contest.startTime) < new Date() && new Date(contest.endTime) > new Date())
                    .map((contest: ContestWithParticipantsType, index: number) => {
                      return (
                        <ContestList key={index} contest={contest} />
                      )
                    })
                }
              </div>
            </>
          }
          {
            allContests.length > 0 &&
            allContests.filter(contest => new Date(contest.startTime) > new Date()).length > 0 &&
            <>
              <div className='font-bold px-1 py-1 text-xl text-center border-t border-slate-300'>
                Upcoming
              </div>
              <div className='bg-pink-500 w-full flex flex-col'>
                {
                  allContests.filter(contest => new Date(contest.startTime) > new Date())
                    .map((contest: ContestWithParticipantsType, index: number) => {
                      return (
                        <ContestList key={index} contest={contest} />
                      )
                    })
                }
              </div>
            </>
          }
          {
            allContests.length > 0 &&
            allContests.filter(contest => new Date(contest.endTime) < new Date()).length > 0 &&
            <>
              <div className='font-bold px-1 py-1 text-xl text-center border-t border-slate-300'>
                Past
              </div>
              <div className='bg-pink-500 w-full flex flex-col'>
                {
                  allContests.filter(contest => new Date(contest.startTime) < new Date())
                    .map((contest: ContestWithParticipantsType, index: number) => {
                      return (
                        <ContestList key={index} contest={contest} />
                      )
                    })
                }
              </div>
            </>
          }
        </div>

      </div>
    </div>
  )
}

const ContestList = ({ contest }: { contest: ContestWithParticipantsType }) => {
  function timeDifference(dt2: Date, dt1: Date): string {
    const diff = dt2.getTime() - dt1.getTime();
    const hours = diff / (1000 * 60 * 60);
    const minutes = (diff % (1000 * 60 * 60)) / (1000 * 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}h`;
  }

  return (
    <Link
      href={`/code/contests/${contest.contestID}/announcement`}
      className={`group w-full p-1 flex justify-between items-center hover:text-pink-500 hover:bg-white border-y border-slate-300`}
    >
      <div className='w-full'>
        <div>
          <span className='font-bold'>{contest.contestName}</span>
        </div>
        <div>
          {String(new Date(contest.startTime).toLocaleDateString())}
          {', ' + String(new Date(contest.startTime).toLocaleTimeString())} |
          {' ' + timeDifference(new Date(contest.endTime), new Date(contest.startTime))}
        </div>
      </div>

      <div className='w-20 text-right'>
        <Link href={`/code/contests/${contest.contestID}/participants`} className='flex gap-1 justify-end items-center hover:underline'>
          <span>{contest.participantCount}</span>
          <FontAwesomeIcon icon={faPeopleGroup} className="text-s" />
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Contests
