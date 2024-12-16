"use client"
import React, { useState, useEffect, useContext } from 'react'
import { SelectedContestContext } from '@utils/contexts'
import { ContestStandingsType } from '@utils/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus, faSync } from '@fortawesome/free-solid-svg-icons'

const ContestStandings = () => {
  const { selectedContest } = useContext(SelectedContestContext)
  const [standings, setStandings] = useState<ContestStandingsType[] | null>(null)
  const [standingsFetchTime, setStandingsFetchTime] = useState<string>('')

  useEffect(() => {
    if (!selectedContest) return
    fetchStandings()
  }, [selectedContest])

  const fetchStandings = async () => {
    if (!selectedContest) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/${selectedContest.contestID}/standings/api`, {
        method: 'POST',
        body: JSON.stringify({
          contestID: selectedContest.contestID,
          startTime: new Date(selectedContest.startTime).getTime().toString(),
          endTime: new Date(selectedContest.endTime).getTime().toString()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)
      setStandings(() => data.result)
      setStandingsFetchTime(() => new Date().toLocaleTimeString())
    } catch (error) {
      console.log(error)
    }
  }

  const getPenalty = (penalty: number, wrongSubmissions: number) => {
    if (!penalty) return 0
    if (!selectedContest) return 0
    const timeDifference = new Date(penalty * (-1) - new Date(selectedContest.startTime).getTime()).getTime()
    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60) + hours * 60)
    return minutes + 5 * wrongSubmissions
  }

  return (
    <div className='w-full min-h-screen flex flex-col gap-2'>
      <div className='w-full bg-pink-600 py-1.5 px-2 flex justify-between items-center'>
        <span className='text-2xl font-bold'>Standings</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>Last Updated: {standingsFetchTime}</span>
          <FontAwesomeIcon icon={faSync} className='text-white cursor-pointer' onClick={fetchStandings} title='Refresh Standings' />
        </div>
      </div>

      {
        standings && standings.length > 0 &&
        <table className='w-full px-2 mx-auto table-auto'>
          <thead>
            <tr>
              <th className='w-[5%] min-w-fit px-2 border border-slate-500'>#</th>
              <th className='min-w-fit px-2 border border-slate-500'>Username (email)</th>
              <th className='w-[5%] min-w-fit px-2 border border-slate-500 text-green-500'>
                <FontAwesomeIcon icon={faCheck} title='Accepted Problems' />
              </th>
              <th className='w-[5%] min-w-fit px-2 border border-slate-500'>Penalty</th>
              {
                standings[0].problems.map((problem, index) => (
                  <th key={index} className='min-w-fit px-2 border border-slate-500 overflow-clip'>{problem.problemName}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              standings.map((participant, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-black'}`}>
                  <td className='text-center border border-slate-500 py-1'>
                    {index + 1}
                  </td>
                  <td className='text-center border border-slate-500 py-1'>
                    {participant.username} ({participant.email})
                  </td>
                  <td className='text-center border border-slate-500 py-1'>
                    {participant.acceptedProblemCount === null ? 0 : participant.acceptedProblemCount}
                  </td>
                  <td className='text-center border border-slate-500 py-1'>
                    {getPenalty(participant.score.penalty, participant.problems.reduce((acc, problem) => acc + (problem.wrongSubmissions ? problem.wrongSubmissions : 0), 0))}
                  </td>
                  {
                    participant.problems.map((problem, index) => (
                      <td key={index} className='text-center border border-slate-500 py-1'>
                        {
                          problem.minimumVerdict !== null ?
                            problem.minimumVerdict === 0 ?
                              <div className='flex items-center justify-center gap-1 w-full text-green-500 text-center'>
                                <FontAwesomeIcon icon={faCheck} title='Accepted' />
                                <span>{problem.wrongSubmissions}</span>
                              </div> :
                              <div className='flex items-center justify-center gap-1 w-full text-red-500 text-center'>
                                <FontAwesomeIcon icon={faPlus} className='rotate-45' title='Incorrect' />
                                <span>{problem.wrongSubmissions}</span>
                              </div>
                            : ''
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default ContestStandings
