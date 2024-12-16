import React, { Suspense } from 'react'
import Loading from './loading'
import ProblemNavbar from '@components/content/problemset/ProblemNavbar'
import { SelectedProblemContext } from '@utils/contexts';

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
      </Suspense>
    </div>
  )
}

export default layout
