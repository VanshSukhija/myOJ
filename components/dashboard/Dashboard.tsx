import React, { Dispatch, SetStateAction } from 'react'
import Home from "./Home"
import Problemset from "./Problemset"
import Contests from "./Contests"
import Blogs from "./Blogs"
import Create from "./Create"
import Profile from "./Profile"
import Settings from "./Settings"

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
    <main className="text-white bg-sky-950 w-1/5">
      {renderSwitch(active)}
    </main>
  )
}

export default Dashboard
