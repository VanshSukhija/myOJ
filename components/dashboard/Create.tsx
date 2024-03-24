"use client";
import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ContestType } from '@utils/types';
import { useSession } from 'next-auth/react';
import { ContestContext } from '@app/code/create/layout';

const Create = () => {
  const { data: session } = useSession()
  const contestID = `${Date.now()}`
  const [allContests, setAllContests] = useState<ContestType[]>([])
  const { hasRendered, setHasRendered } = useContext(ContestContext);

  useEffect(() => {
    setHasRendered(() => false)

    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api`)
      const data = await res.json()
      setAllContests(() => data)
    }

    fetchData()
  }, [])

  useEffect(() => console.log(allContests), [allContests])
  useEffect(() => console.log(hasRendered), [hasRendered])

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
              allContests
                .filter((contest: ContestType) => contest.createdBy === session?.user.id)
                .map((contest: ContestType, idx: number) => {
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

const EditContest = ({ contest }: { contest: ContestType }) => {
  return (
    <Link href={`/code/create/${contest.contestID}/description`} className={`group w-full p-1 flex justify-between items-center hover:text-red-500 hover:bg-white border-y border-slate-300`} >
      <div className='w-full'>
        <div>{contest.contestID} | {contest.contestName}</div>
        {/* <div className='truncate'>
          {
            contest.tags.map((tag: string, index: number) => {
              return (
                <span key={tag} className='text-xs text-slate-300 group-hover:text-red-500'>{tag}{index === contest.tags.length - 1 ? '' : ', '} </span>
              )
            })
          }
        </div> */}
      </div>
      <div className='w-20 text-right'>
        {
          // data.difficulty == 0 ? <div><span className='bg-green-500 px-2 rounded-lg group-hover:text-white'>Easy</span></div> :
          //   data.difficulty == 1 ? <div><span className='bg-yellow-500 px-2 rounded-lg group-hover:text-white'>Medium</span></div> :
          //     <div><span className='bg-red-600 px-2 rounded-lg group-hover:text-white'>Hard</span></div>
        }
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Create
