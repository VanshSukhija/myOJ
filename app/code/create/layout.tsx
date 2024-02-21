"use client"
import React, { Suspense, createContext, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { useParams } from 'next/navigation'
import NewCreate from '@components/dashboard/NewCreate'
import { ProblemType } from '@components/content/problemset/ProblemNavbar'

export const ProblemContext = createContext<{
  problem: ProblemType;
  setProblem: React.Dispatch<React.SetStateAction<ProblemType>>;
}>({
  problem: Object(),
  setProblem: function (value: React.SetStateAction<ProblemType>): void {
    throw new Error('Function not implemented.')
  }
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()

  const [problem, setProblem] = useState<ProblemType>({
    id: Number(params.problemID),
    name: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    difficulty: 0,
    tags: [],
    submissions: [],
    testcases: [],
    note: "",
    tutorial: "",
    solution: "",
    createdBy: "",
    timeLimit: 0,
    memoryLimit: 0
  })

  return (
    <ProblemContext.Provider value={{ problem, setProblem }}>
      <Suspense fallback={<Loading />}>
        {params.problemID ?
          <NewCreate /> :
          <Dashboard active="Create" />
        }
      </Suspense>
      <div className="bg-black text-white flex-1">
        {children}
      </div>
    </ProblemContext.Provider>
  )
}

export default layout
