"use client";
import { SelectedProblemContext } from '@app/code/problemset/layout';
import React, { useContext } from 'react'

const ProblemFooter = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)
  return (
    selectedProblem &&
    <div className='w-full h-fit bg-cyan-600 py-2 px-2 border-t-2 border-white flex justify-between mt-5'>
      <div className='text-white text-sm'>
        {selectedProblem?.contestName}
      </div>
      <div className='text-white text-sm'>
        {selectedProblem?.username}
      </div>
    </div>
  )
}

export default ProblemFooter
