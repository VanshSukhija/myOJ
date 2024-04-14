"use client";
import React, { Suspense, createContext, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { DisplayProblemType, OnlyContestsType } from '@utils/types';
import { usePathname } from 'next/navigation';
import ContestProblems from '@components/dashboard/ContestProblems';

export const SelectedContestContext = createContext<{
  selectedContest: OnlyContestsType | null;
  setSelectedContest: React.Dispatch<React.SetStateAction<OnlyContestsType | null>>;
}>({
  selectedContest: null,
  setSelectedContest: function (value: React.SetStateAction<OnlyContestsType | null>): void {
    throw new Error('Function not implemented.')
  }
});

export const SelectedProblemContext = createContext<{
  selectedProblem: DisplayProblemType | null;
  setSelectedProblem: React.Dispatch<React.SetStateAction<DisplayProblemType | null>>;
}>({
  selectedProblem: null,
  setSelectedProblem: function (value: React.SetStateAction<DisplayProblemType | null>): void {
    throw new Error('Function not implemented.')
  }
});

const layout = (
  {
    children
  }: {
    children: React.ReactNode
  }
) => {
  const pathname = usePathname()
  const [selectedContest, setSelectedContest] = useState<OnlyContestsType | null>(null)
  const [selectedProblem, setSelectedProblem] = useState<DisplayProblemType | null>(null)

  return (
    <SelectedContestContext.Provider value={{ selectedContest, setSelectedContest }}>
      <SelectedProblemContext.Provider value={{ selectedProblem, setSelectedProblem }}>      
      <Suspense fallback={<Loading />}>
        {
          pathname.includes('problems') || pathname.includes('standings') ? <ContestProblems /> : <Dashboard active="Contests" />
        }
      </Suspense>
      <div className="bg-black text-white flex-1">
        {children}
      </div>
      </SelectedProblemContext.Provider>
    </SelectedContestContext.Provider>
  )
}

export default layout
