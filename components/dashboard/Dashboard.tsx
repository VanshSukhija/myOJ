import React from 'react'
import Home from '@components/dashboard/Home'
import Problemset from '@components/dashboard/Problemset'
import Contests from '@components/dashboard/Contests'
import Blogs from '@components/dashboard/Blogs'
import Create from '@components/dashboard/Create'
import Profile from '@components/dashboard/Profile'
import Settings from '@components/dashboard/Settings'

const Dashboard = ({ active }: { active: string }) => {

  const renderSwitch = (active: string) => {
    switch (active) {
      case "Home":
        return <Home />
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
      case "Settings":
        return <Settings />
    }
  }

  return (
    <main className="text-white w-1/4 overflow-y-auto">
      {renderSwitch(active)}
    </main>
  )
}

export default Dashboard
