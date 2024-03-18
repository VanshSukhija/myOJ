"use client"
import React, { Suspense, createContext, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { useParams } from 'next/navigation'
import { ContestType, ProblemType } from '@utils/types'
import ContestCreate from '@components/dashboard/ContestCreate'
import NewCreate from '@components/dashboard/ProblemCreate'

export const ContestContext = createContext<{
  contest: ContestType;
  setContest: React.Dispatch<React.SetStateAction<ContestType>>;
}>({
  contest: Object(),
  setContest: function (value: React.SetStateAction<ContestType>): void {
    throw new Error('Function not implemented.')
  }
});

export const ProblemContext = createContext<{
  problem: ProblemType;
  setProblem: React.Dispatch<React.SetStateAction<ProblemType>>;
}>({
  problem: Object(),
  setProblem: function (value: React.SetStateAction<ProblemType>): void {
    throw new Error('Function not implemented.')
  }
});

const emptyContest: ContestType = {
  id: 0,
  name: "",
  description: "",
  createdBy: "user1",
  startTime: "",
  endTime: "",
  registrationTime: "",
  problems: [],
}

const emptyProblem: ProblemType = {
  id: 0,
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
  createdBy: "user1",
  timeLimit: 0,
  memoryLimit: 0

}

const layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const [contest, setContest] = useState<ContestType>(emptyContest)
  const [problem, setProblem] = useState<ProblemType>(emptyProblem)

  return (
    <ContestContext.Provider value={{ contest, setContest }}>
      <ProblemContext.Provider value={{ problem, setProblem }}>
        <Suspense fallback={<Loading />}>
          {
            params.contestID ?
              params.problemID ? <NewCreate /> : <ContestCreate />
              : <Dashboard active="Create" />
          }
        </Suspense>
        <div className="bg-black text-white flex-1">
          {children}
        </div>
      </ProblemContext.Provider>
    </ContestContext.Provider>
  )
}

export default layout
