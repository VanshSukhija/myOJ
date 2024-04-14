"use client";
import { DisplayProblemType } from '@utils/types';
import React, { useContext } from 'react'

const ProblemFooter = ({ SelectedProblemContext, primaryColor }: {
  SelectedProblemContext: React.Context<{
    selectedProblem: DisplayProblemType | null;
    setSelectedProblem: React.Dispatch<React.SetStateAction<DisplayProblemType | null>>
  }>,
  primaryColor: string
}) => {
  const { selectedProblem } = useContext(SelectedProblemContext)
  return (
    selectedProblem &&
    <div className={`w-full h-fit bg-${primaryColor} py-2 px-2 border-t-2 border-white flex justify-between mt-5`}>
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
