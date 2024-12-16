"use client";
import React, { Suspense, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { DisplayProblemType } from '@utils/types';
import { SelectedProblemContext } from '@utils/contexts';

const layout = (
  {
    children
  }: {
    children: React.ReactNode
  }
) => {

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
