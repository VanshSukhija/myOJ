"use client"
import React, { Suspense } from 'react'
import Dashboard from '@components/dashboard/Dashboard'
import Loading from './loading'
import { useParams } from 'next/navigation'
import NewCreate from '@components/dashboard/NewCreate'

const layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  return (
    <>
      <Suspense fallback={<Loading />}>
        {
          params.problemID ? <NewCreate /> : <Dashboard active="Create" />
        }
      </Suspense>
      <div className="bg-black text-white flex-1">
        {children}
      </div>
    </>
  )
}

export default layout
