"use client"
import React, { Suspense, createContext, useState } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { useParams } from 'next/navigation'
import { ContestType, ProblemType } from '@utils/types'
import ContestCreate from '@components/dashboard/ContestCreate'
import NewCreate from '@components/dashboard/ProblemCreate'
import { useSession } from 'next-auth/react'

export const ContestContext = createContext<{
  contest: ContestType;
  setContest: React.Dispatch<React.SetStateAction<ContestType>>;
  hasRendered: boolean;
  setHasRendered: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  contest: Object(),
  setContest: function (value: React.SetStateAction<ContestType>): void {
    throw new Error('Function not implemented.')
  },
  hasRendered: false,
  setHasRendered: function (value: React.SetStateAction<boolean>): void {
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

const layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { data: session } = useSession()

  const emptyContest: ContestType = {
    contestID: `${Date.now()}`,
    contestName: "",
    contestDescription: "",
    createdBy: session?.user.id,
    startTime: "",
    endTime: "",
    registrationTime: "",
    problems: [],
  }
  const emptyProblem: ProblemType = {
    problemID: `${Date.now()}`,
    contestID: "",
    problemName: "",
    problemDescription: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    difficulty: 0,
    tags: '',
    testcases: [],
    note: "",
    tutorial: "",
    solution: "",
    createdBy: session?.user.id,
    timeLimit: 0,
    memoryLimit: 0,
    solutionLanguage: "",
    checkerCode: "",
    checkerLanguage: "",
  }

  const [contest, setContest] = useState<ContestType>(emptyContest)
  const [problem, setProblem] = useState<ProblemType>(emptyProblem)
  const [hasRendered, setHasRendered] = useState(false)

  return (
    <ContestContext.Provider value={{ contest, setContest, hasRendered, setHasRendered }}>
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
