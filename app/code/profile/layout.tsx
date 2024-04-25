"use client";
import React, { Suspense } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Dashboard active="Profile" />
      </Suspense>
      <div className="bg-black text-white flex-1">
        {children}
      </div>
    </>
  )
}

export default layout
