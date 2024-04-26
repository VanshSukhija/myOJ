"use client"
import React, { useEffect, useState } from 'react'
import SubmissionCalendar from './SubmissionCalendar'
import { useParams, usePathname } from 'next/navigation'

const ProfilePage = () => {
  const params = useParams()
  const pathname = usePathname()
  const [SubmissionCalendarData, setSubmissionCalendarData] = useState<{
    submissionDate: string, submissionCount: number
  }[]>([])

  useEffect(() => {
    const fetchSubmissionCalendarData = async (retry: number) => {
      if(retry === 0) return
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/getSubmissionData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: params.userID })
        })
        const data = await response.json()
        console.log(data)
        if(data.status === 'error') throw new Error(data.error)
        setSubmissionCalendarData(data.results)
      } catch (error) {
        fetchSubmissionCalendarData(retry - 1)
        console.log(error)
      }
    }

    fetchSubmissionCalendarData(3)
  }, [params.userID, pathname])

  return (
    <div className='h-screen w-full overflow-auto flex flex-col justify-start items-center gap-3'>
      <nav className='w-full h-fit bg-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          User Details
        </div>
      </nav>

      <div className='w-[95%] h-1/3 border border-green-500 rounded-xl'>
        <SubmissionCalendar
          data={SubmissionCalendarData}
        />
      </div>
      
    </div>
  )
}

export default ProfilePage
