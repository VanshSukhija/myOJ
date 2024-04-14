"use client"
import { SelectedContestContext } from '@app/code/contests/layout'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OnlyProblemType } from '@utils/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import ProblemListItem from './ProblemListItem'

const ContestProblems = () => {
  const { selectedContest, setSelectedContest } = useContext(SelectedContestContext)
  const [remainingTime, setRemainingTime] = useState<string>('')
  const params = useParams()
  const { data: session, status } = useSession()
  const [allProblems, setAllProblems] = useState<OnlyProblemType[]>([])

  useEffect(() => {
    if(selectedContest && new Date(selectedContest.startTime).getTime() > new Date().getTime()) return
    if (!params.contestID) return
    if (status === 'loading') return
    if (!session) return

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/${params.contestID}/problems/api`, {
          method: 'POST',
          body: JSON.stringify({ contestID: params.contestID, userID: session.user.id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setSelectedContest(() => data.contestDetails)
        setAllProblems(() => data.problems)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params, session, status])

  useEffect(() => {
    if (selectedContest === null) return
    const contestEndTime = new Date(selectedContest.endTime).getTime()
    const intervalID = setInterval(() => {
      const currentTime: number = new Date().getTime()
      const timeLeft: number = contestEndTime - currentTime

      if (timeLeft <= 0) {
        setRemainingTime('Contest Ended')
        clearInterval(intervalID)
        return
      }

      let days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      let hours: string = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 24 * days).toString()
      let minutes: string = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString()
      let seconds: string = Math.floor((timeLeft % (1000 * 60)) / 1000).toString()

      if (parseInt(hours) < 10) hours = '0' + hours
      if (parseInt(minutes) < 10) minutes = '0' + minutes
      if (parseInt(seconds) < 10) seconds = '0' + seconds

      setRemainingTime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

  }, [selectedContest])

  return (
    <div className='w-1/4 text-white flex h-screen flex-col items-center justify-between bg-pink-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5 text-center'>
          {selectedContest?.contestName}
        </div>

        <div className='w-full flex flex-col items-center bg-pink-500 py-2 gap-2'>
          <div className='w-full text-xl font-bold text-center'>
            {remainingTime}
          </div>

          <Link href={`/code/contests/${params.contestID}/standings`} className='bg-white text-pink-500 text-center font-bold py-1 w-[90%]'>
            Standings
          </Link>
        </div>

        <div className='w-full'>
          <div className='w-full font-bold p-1 text-xl text-center'>Problems</div>
          <div className='w-full flex flex-col'>
            {
              allProblems.length > 0 &&
              allProblems.map((problem: OnlyProblemType, index: number) => (
                <ProblemListItem key={index} problem={problem} index={index + 1} primaryColor='pink-500' />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContestProblems
