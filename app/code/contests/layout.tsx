"use client";
import React, { Suspense, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { DisplayProblemType, OnlyContestsType } from '@utils/types';
import { usePathname } from 'next/navigation';
import ContestProblems from '@components/dashboard/ContestProblems';
import { SelectedContestContext, SelectedProblemContext } from '@utils/contexts';

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
