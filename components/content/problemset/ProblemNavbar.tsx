"use client"
import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faEllipsisV, faPen, faPlay, faThunderstorm } from "@fortawesome/free-solid-svg-icons";
import { notFound, useParams, usePathname } from 'next/navigation'
import Link from 'next/link';
import { codeRunner } from '@utils/functions';
import { DisplayProblemType, SubmissionOutputType } from '@utils/types';
import { useSession } from 'next-auth/react';

const ProblemNavbar = ({ SelectedProblemContext, primaryColor }: {
  SelectedProblemContext: React.Context<{
    selectedProblem: DisplayProblemType | null;
    setSelectedProblem: React.Dispatch<React.SetStateAction<DisplayProblemType | null>>
  }>,
  primaryColor: string,
}) => {
  const params = useParams()
  const pathname = usePathname().split('/')
  const { selectedProblem, setSelectedProblem } = useContext(SelectedProblemContext)
  const tab = pathname[pathname.length - 1]

  useEffect(() => {
    if (!params.problemID) return;
    setSelectedProblem(() => null);

    const fetchProblem = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/problems/${params.problemID}/getProblemByID`, {
          method: 'POST',
          body: JSON.stringify({ problemID: params.problemID }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'error') throw new Error(data.error);
        setSelectedProblem(() => data.data);
      } catch (err) {
        fetchProblem();
        console.error(err);
      }
    }

    fetchProblem();
  }, [params.problemID])

  return (
    <>
      <nav className={`p-1.5 flex justify-between border-b-2 bg-${primaryColor}`}>
        <div className='flex flex-col justify-between gap-1'>
          <div className='text-2xl font-bold'>{selectedProblem?.problemName}</div>
          <div className='text-white'>
            {selectedProblem?.difficulty == 0 ? <span className='bg-green-500 px-2 rounded-lg'>Easy</span> :
              selectedProblem?.difficulty == 1 ? <span className='bg-yellow-500 px-2 rounded-lg'>Medium</span> :
                selectedProblem?.difficulty == 2 ?
                  <span className='bg-red-500 px-2 rounded-lg'>Hard</span> :
                  <span className='bg-gray-500 px-2 rounded-lg'>Unknown</span>
            } |
            {
              selectedProblem?.tags
                .split(',')
                .map((tag: string, index: number) => {
                  return (
                    <span key={tag}> {index == selectedProblem?.tags.split(',').length - 1 ? tag : tag + ','}</span>
                  )
                })
            }
          </div>
          <div className="text-white flex gap-4">
            <div className='w-fit h-fit flex items-center gap-1'>
              <FontAwesomeIcon icon={faClock} title="Time Limit" />
              <code title='Time Limit'>{selectedProblem && selectedProblem.timeLimit / 1000}s</code>
            </div>
            <div className='w-fit h-fit flex items-center gap-1'>
              <FontAwesomeIcon icon={faThunderstorm} title="Memory Limit" />
              <code title='Memory Limit'>{selectedProblem?.memoryLimit}MB</code>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end text-right justify-end'>
          {
            selectedProblem &&
            <div className='flex gap-1 items-center'>
              <FontAwesomeIcon icon={faCalendar} title="Contest" />
              <Link 
                href={`/code/contests/${selectedProblem.contestID}/announcement`} 
                className='hover:underline'
              >
                {selectedProblem.contestName}
              </Link>
            </div>
          }
          {
            selectedProblem &&
            <div className='flex gap-1 items-center'>
              <FontAwesomeIcon icon={faPen} title="Author" />
              <Link 
                href={`/code/profile/${selectedProblem.createdBy}`} 
                className='hover:underline'
              >
                {selectedProblem.username}
              </Link>
            </div>
          }
        </div>
      </nav>

      <nav className='w-full border-b-2'>
        <Link href={`${pathname.slice(0, -1).join('/')}/description`}>
          <button className={`w-1/6 border-x-2 py-1 px-2 hover:bg-white hover:text-${primaryColor} ${tab === 'description' ? `bg-${primaryColor} text-white` : ''}`}>
            Description
          </button>
        </Link>
        <Link href={`${pathname.slice(0, -1).join('/')}/submissions`}>
          <button className={`w-1/6 border-r-2 py-1 px-2 hover:bg-white hover:text-${primaryColor} ${tab === 'submissions' ? `bg-${primaryColor} text-white` : ''}`}>
            Submissions
          </button>
        </Link>
        <Link href={`${pathname.slice(0, -1).join('/')}/ide`}>
          <button className={`w-1/6 border-r-2 py-1 px-2 hover:bg-white hover:text-${primaryColor} ${tab === 'ide' ? `bg-${primaryColor} text-white` : ''}`}>
            IDE
          </button>
        </Link>
      </nav>
    </>
  )
}

export default ProblemNavbar