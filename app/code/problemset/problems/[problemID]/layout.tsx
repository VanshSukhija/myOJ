import React, { Suspense } from 'react'
import Loading from './loading'
import ProblemNavbar from '@components/content/problemset/ProblemNavbar'

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
