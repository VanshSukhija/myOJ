import { OnlyContestsType } from '@utils/types';
import React from 'react'

const ContestHeader = ({ contest }: { contest: OnlyContestsType | null }) => {
  function timeDifference(dt2: Date, dt1: Date): string {
    const diff = dt2.getTime() - dt1.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = (diff % (1000 * 60 * 60)) / (1000 * 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}h`;
  }

  return (
    contest && <div className='flex flex-col items-center justify-center bg-pink-600 py-2 gap-1'>
      <div className='text-2xl font-bold'>{contest?.contestName}</div>
      <div className='flex'>
        <div className='px-2'>
          {contest && new Date(contest.startTime).toLocaleDateString()}
        </div>
        <div className='px-2 border-x border-white'>
          {contest && new Date(contest.startTime).toLocaleTimeString()}
        </div>
        <div className='px-2'>
          {contest && timeDifference(new Date(contest.endTime), new Date(contest.startTime))}
        </div>
      </div>
    </div>
  )
}

export default ContestHeader
