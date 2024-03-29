"use client";
import { SelectedProblemContext } from '@app/code/problemset/layout';
import React, { useContext } from 'react'

const ProblemFooter = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)
  return (
    <div className='w-full bg-cyan-600 py-2 px-1 border-t-2 border-white'>
      <div className='text-white text-sm'>
        {selectedProblem?.contestName}
      </div>
      <div className='text-white text-sm'>
        {selectedProblem?.createdBy}
      </div>
    </div>
  )
}

export default ProblemFooter
