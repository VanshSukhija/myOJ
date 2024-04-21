"use client"
import React, { useEffect, useState } from 'react'
import { OnlyProblemType } from '@utils/types';
import { Tags } from '@utils/constants';
import { useSession } from 'next-auth/react';
import ProblemListItem from '@components/dashboard/ProblemListItem';

// const fetchData = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/code/problemset/docker');
//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fetchData();

const Problemset = () => {
  const [allProblems, setAllProblems] = useState<OnlyProblemType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const fetchProblems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/api/getProblems`, {
          method: 'POST',
          body: JSON.stringify({ userID: session.user.id }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        setAllProblems(() => data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProblems();
  }, [session])

  return (
    <div className='flex flex-col h-screen justify-between items-center bg-sky-950'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Problem Set</div>

        <Filters />

        {
          allProblems.length > 0 && allProblems.map((problem: OnlyProblemType, idx: number) => {
            return (
              <ProblemListItem key={idx} problem={problem} index={idx + 1} primaryColor='cyan-600' />
            )
          })
        }
      </div>

      {/* <code>{'<<'} {'<'} | 1 | 2 | 3 | 4 | 5 | {'>'} {'>>'}</code> */}
    </div>
  )
}

const Filters = () => {

  return (
    <div className='p-1 w-full bg-cyan-600 flex flex-col items-center border-y-2 border-slate-400'>
      <div className='flex justify-between w-full mb-2'>
        <span>Difficulty: </span>
        <div>
          <input type='text' min='800' max='3500' className='w-20' />
          <span> to </span>
          <input type='text' min='800' max='3500' className='w-20' />
        </div>
      </div>
      <div className='flex justify-between w-full mb-1'>
        <span>Tags: </span>
        <select className='w-48 text-black'>
          <option value='all'>All</option>
          {
            Tags.map((tag: string) => {
              return (
                <option key={tag} value={tag} className='text-black'>{tag}</option>
              )
            })
          }
        </select>
      </div>
      <button className='bg-sky-950 p-1 mt-1 w-full rounded'>Apply Filters</button>
    </div>
  )
}

export default Problemset
