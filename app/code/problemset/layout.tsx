import React from 'react'
import Dashboard from '@components/dashboard/Dashboard'

const layout = (
  {
    children
  }: {
    children: React.ReactNode
  }) => {
  return (
    <>
      <Dashboard active="Problemset" />
      <div className="bg-black text-white flex-1">
        {children}
      </div>
    </>
  )
}

export default layout
