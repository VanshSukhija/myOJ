import React, { Suspense } from 'react'
import Loading from './loading'
import ProblemNavbar from '@components/content/problemset/ProblemNavbar'

export type ProblemType = {
  id: number;
  name: string;
  description: {
    statement: string;
    input: string;
    output: string;
    constraints: string;
  };
  difficulty: number;
  tags: string[];
  submissions: {
    id: number;
    user: string;
    time: number;
    result: string;
  }[];
  testcases: {
    id: number;
    input: string;
    output: string;
  }[];
  note: string;
  tutorial: string;
  solution: string;
}

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <div className="flex-col h-screen overflow-auto">
      <Suspense fallback={<Loading />}>
        <ProblemNavbar />
      </Suspense>
      {children}
    </div>
  )
}

export default layout
