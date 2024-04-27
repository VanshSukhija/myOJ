"use client"
import React, { useEffect, useState } from 'react'
import SubmissionCalendar from '@components/content/profile/SubmissionCalendar'
import SubmissionPie from '@components/content/profile/SubmissionPie'
import { useParams, usePathname } from 'next/navigation'
import { verdictNames } from '@utils/constants'

const ProfilePage = () => {
  const params = useParams()
  const pathname = usePathname()
  const [SubmissionCalendarData, setSubmissionCalendarData] = useState<{
    submissionDate: string, submissionCount: number
  }[]>([])
  const [submissionsByLanguage, setSubmissionsByLanguage] = useState<{
    language: string, submissionCount: number
  }[]>([])
  const [submissionsByDifficulty, setSubmissionsByDifficulty] = useState<{
    difficulty: string, submissionCount: number
  }[]>([])
  const [submissionsByVerdict, setSubmissionsByVerdict] = useState<{
    verdict: number, submissionCount: number
  }[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSubmissionCalendarData = async (retry: number) => {
      if (retry === 0) return
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/getSubmissionData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: params.userID })
        })
        const data = await response.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)

        data.results[0].length > 0 && setSubmissionCalendarData(data.results[0].map((res: any) => {
          return {
            submissionDate: new Date(res.submissionDate).toISOString().split('T')[0],
            submissionCount: res.submissionCount
          }
        }))

        data.results[1].length > 0 && setSubmissionsByLanguage(data.results[1].map((res: any) => {
          return {
            language: res.language,
            submissionCount: res.submissionCount
          }
        }))

        data.results[2].length > 0 && setSubmissionsByVerdict(data.results[2].map((res: any) => {
          return {
            verdict: res.verdict,
            submissionCount: res.submissionCount
          }
        }))

        data.results[3].length > 0 && setSubmissionsByDifficulty(data.results[3].map((res: any) => {
          return {
            difficulty: res.difficulty,
            submissionCount: res.submissionCount
          }
        }))

      } catch (error) {
        fetchSubmissionCalendarData(retry - 1)
        console.log(error)
      } finally {
        setLoading(false)
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

      <div className='w-[95%] h-1/3 border border-green-500 rounded-xl p-2'>
        {
          loading ?
            <div>Loading...</div> :
            <SubmissionCalendar
              data={SubmissionCalendarData}
            />
        }
      </div>

      <div className='w-[95%] h-1/3 border border-green-500 rounded-xl p-2'>
        {
          loading ?
            <div>Loading...</div> :
            <div className='flex w-full h-full gap-3'>
              <SubmissionPie
                title='Submission Difficulty Distribution'
                data={submissionsByDifficulty.length === 0 ? [] :
                  submissionsByDifficulty.map((item) => {
                    return {
                      id: item.difficulty,
                      label: item.difficulty,
                      value: item.submissionCount,
                    }
                  })
                }
              />

              <div className='h-full w-[1px] bg-green-500' />

              <SubmissionPie
                title='Submission Language Distribution'
                data={submissionsByLanguage.length === 0 ? [] :
                  submissionsByLanguage.map((item) => {
                    return {
                      id: item.language,
                      label: item.language,
                      value: item.submissionCount,
                    }
                  })
                }
              />
            </div>
        }
      </div>

      <div className='w-[95%] h-1/3 border border-green-500 rounded-xl p-2'>
        {
          loading ?
            <div>Loading...</div> :
            <div className='flex w-full h-full gap-3'>
              <SubmissionPie
                title='Submission Verdict Distribution'
                data={submissionsByVerdict.length === 0 ? [] :
                  submissionsByVerdict.map((item: {verdict: number, submissionCount: number}) => {
                    return {
                      id: verdictNames[item.verdict > 6 ? 6 : item.verdict],
                      label: verdictNames[item.verdict > 6 ? 6 : item.verdict],
                      value: item.submissionCount,
                    }
                  })
                }
              />

              <div className='h-full w-[1px] bg-green-500' />
              
              <SubmissionPie
                title='Submission Language Distribution'
                data={submissionsByLanguage.length === 0 ? [] :
                  submissionsByLanguage.map((item) => {
                    return {
                      id: item.language,
                      label: item.language,
                      value: item.submissionCount,
                    }
                  })
                }
              />
            </div>
        }
      </div>

    </div>
  )
}

export default ProfilePage
