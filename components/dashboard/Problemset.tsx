"use client"
import React, { useEffect, useState } from 'react'
import { OnlyProblemType } from '@utils/types';
import { useSession } from 'next-auth/react';
import ProblemListItem from '@components/dashboard/ProblemListItem';
import ProblemsetFilters from '@components/dashboard/ProblemsetFilters';

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
  const [filters, setFilters] = useState<{
    difficultyMask: string[],
    tags: string[]
  }>({
    difficultyMask: [],
    tags: []
  })

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

        <ProblemsetFilters setFilters={setFilters} filters={filters} />

        {
          allProblems.length > 0 &&
          allProblems.filter((problem: OnlyProblemType) => {
            const difficulty = problem.difficulty === 0 ? 'Easy' : problem.difficulty === 1 ? 'Medium' : 'Hard';

            const flag1: boolean = filters.difficultyMask.length === 0 || filters.difficultyMask.includes(difficulty);
            const flag2: boolean = filters.tags.length === 0 || filters.tags.every((tag: string) => problem.tags.includes(tag));

            return flag1 && flag2;
          })
          .map((problem: OnlyProblemType, idx: number) => {
            return (
              <ProblemListItem
                key={idx}
                problem={problem}
                index={idx + 1}
                primaryColor='cyan-600'
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Problemset
