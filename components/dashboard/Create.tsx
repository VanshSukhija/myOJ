import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ProblemType } from '@utils/types';
import problemset from '@components/dashboard/problems.json';

const Create = () => {
  const contestID = Math.floor(Math.random() * 100000000)
  const user = 'user1'

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
            {problemset.problems.filter((prob: ProblemType) => prob.createdBy === user).map((problem: ProblemType) => {
              return (
                <div key={problem.id} className='w-full'>
                  <EditContest data={problem} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const EditContest = ({ data }: { data: ProblemType }) => {
  return (
    <Link href={`/code/create/${data.id}/description`} className={`group w-full p-1 flex justify-between items-center hover:text-red-500 hover:bg-white border-y border-slate-300`} >
      <div className='w-full'>
        <div>{data.id} | {data.name}</div>
        <div className='truncate'>
          {
            data.tags.map((tag: string, index: number) => {
              return (
                <span key={tag} className='text-xs text-slate-300 group-hover:text-red-500'>{tag}{index === data.tags.length - 1 ? '' : ', '} </span>
              )
            })
          }
        </div>
      </div>
      <div className='w-20 text-right'>
        {data.difficulty == 0 ? <div><span className='bg-green-500 px-2 rounded-lg group-hover:text-white'>Easy</span></div> :
          data.difficulty == 1 ? <div><span className='bg-yellow-500 px-2 rounded-lg group-hover:text-white'>Medium</span></div> :
            <div><span className='bg-red-600 px-2 rounded-lg group-hover:text-white'>Hard</span></div>
        }
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Create
