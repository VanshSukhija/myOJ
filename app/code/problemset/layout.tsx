"use client";
import React, { Suspense, createContext, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { DisplayProblemType } from '@utils/types';

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
}) => {

  const [selectedProblem, setSelectedProblem] = useState<DisplayProblemType | null>(null)

  return (
    <SelectedProblemContext.Provider value={{ selectedProblem, setSelectedProblem }}>
      <Suspense fallback={<Loading />}>
        <Dashboard active="Problemset" />
      </Suspense>
      <div className="bg-black text-white flex-1">
        {children}
      </div>
    </SelectedProblemContext.Provider>
  )
}

export default layout
