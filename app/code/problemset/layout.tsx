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
      {children}
    </>
  )
}

export default layout
