import React, { Suspense } from 'react'
import Loading from './loading'
import ProblemNavbar from '@components/content/problemset/ProblemNavbar'
import ProblemFooter from '@components/content/problemset/ProblemFooter'

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <div className="flex-col flex-1 h-screen overflow-auto">
      <Suspense fallback={<Loading />}>
        <ProblemNavbar />
        {children}
        <ProblemFooter />
      </Suspense>
    </div>
  )
}

export default layout
