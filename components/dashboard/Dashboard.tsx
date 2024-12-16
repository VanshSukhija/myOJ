import React from 'react'
import Problemset from '@components/dashboard/Problemset'
import Contests from '@components/dashboard/Contests'
import Blogs from '@components/dashboard/Blogs'
import Create from '@components/dashboard/Create'
import Profile from '@components/dashboard/Profile'

const Dashboard = ({ active }: { active: string }) => {

  const renderSwitch = (active: string) => {
    switch (active) {
      case "Problemset":
        return <Problemset />
      case "Contests":
        return <Contests />
      case "Blogs":
        return <Blogs />
      case "Create":
        return <Create />
      case "Profile":
        return <Profile />
    }
  }

  return (
    <main className="text-white w-1/4 overflow-y-auto">
      {renderSwitch(active)}
    </main>
  )
}

export default Dashboard
