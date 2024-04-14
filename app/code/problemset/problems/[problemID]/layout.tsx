import React, { Suspense } from 'react'
import Loading from './loading'
import ProblemNavbar from '@components/content/problemset/ProblemNavbar'
import ProblemFooter from '@components/content/problemset/ProblemFooter'
import { SelectedProblemContext } from '@app/code/problemset/layout';

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <div className="flex-col flex-1 h-screen overflow-auto">
      <Suspense fallback={<Loading />}>
        <ProblemNavbar SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
        {children}
        <ProblemFooter SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
      </Suspense>
    </div>
  )
}

export default layout
