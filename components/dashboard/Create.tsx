import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ProblemType } from '@components/content/problemset/ProblemNavbar';
import problemset from '@components/dashboard/problems.json';

const Create = () => {
  const problemID = Math.floor(Math.random() * 1000000000)
  const user = 'user1'
  return (
    <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Create Problem</div>

        <Link href={`/code/create/${problemID}/description`} className='bg-white text-red-500 text-center font-bold py-1 w-[90%] mt-1 mb-3'>
          New Problem
        </Link>

        <div className='w-full'>
          <div className='font-bold px-1 text-xl text-center'>Your Problems</div>
          <div className='bg-red-500 w-full flex flex-col'>
            {problemset.problems.filter((prob: ProblemType) => prob.createdBy === user).map((problem: ProblemType) => {
              return (
                <div key={problem.id} className='w-full'>
                  <EditProblem data={problem} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const EditProblem = ({ data }: { data: ProblemType }) => {
  return (
    <Link href={`/code/create/${data.id}/description`} className={`w-full p-1 flex justify-between items-center hover:text-red-500 hover:bg-white border-y border-slate-300`} >
      <div className='w-full'>
        <div>{data.id} | {data.name}</div>
        <div className='truncate'>
          {
            data.tags.map((tag: string, index: number) => {
              return (
                <span key={tag} className='text-xs text-slate-300'>{tag}{index === data.tags.length - 1 ? '' : ', '} </span>
              )
            })
          }
        </div>
      </div>
      <div className='w-12 text-right'>
        <div>{data.difficulty}</div>
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Create
