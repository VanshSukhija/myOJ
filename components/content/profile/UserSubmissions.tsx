"use client"
import { SubmissionsByProblemType, SubmissionsByUserType } from '@utils/types'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SubmissionModal from '@components/content/problemset/SubmissionModal'
import IndividualSubmission from '@components/content/problemset/IndividualSubmission'
import SubmissionRow from '@components/content/problemset/SubmissionRow'
import { useSession } from 'next-auth/react'

const UserSubmissions = () => {
  const params = useParams()
  const pathname = usePathname()
  const [submissions, setSubmissions] = useState<SubmissionsByUserType[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [submission, setSubmission] = useState<SubmissionsByProblemType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchSubmissions = async (retry: number) => {
      if (retry === 0) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/submissions/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: params.userID })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setSubmissions(data.results)
        setLoading(false)
      } catch (err) {
        fetchSubmissions(retry - 1)
        console.log(err)
      }
    }

    fetchSubmissions(3)
  }, [params.userID, pathname])

  const onOpen = (sub: SubmissionsByProblemType) => {
    setSubmission(sub)
    setIsOpen(true)
  }

  const onClose = () => {
    setSubmission(null)
    setIsOpen(false)
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-col justify-start items-center gap-3'>
      <nav className='w-full h-fit bg-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Latest Submissions
        </div>
      </nav>

      <SubmissionModal isOpen={isOpen} onClose={onClose}>
        <IndividualSubmission submission={submission} onClose={onClose} />
      </SubmissionModal>

      <table className='table-auto border-2 border-slate-600 w-full mx-auto'>
        <thead>
          <tr>
            <th className='border-2 border-slate-600 w-fit px-3 py-2'>#</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>User Name</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Problem Name</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Submission Time</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Language</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Verdict</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Time Taken</th>
            <th className='border-2 border-slate-600 w-fit px-2 py-2'>Memory Used</th>
          </tr>
        </thead>

        <tbody>
          {
            loading ?
              <tr>
                <td colSpan={8} className='border-2 border-slate-600 w-fit px-2 py-2 text-center'>
                  Loading...
                </td>
              </tr> :
              submissions.length > 0 && session &&
              submissions
                .map((sub: SubmissionsByUserType, index: number, array: SubmissionsByUserType[]) => {
                  return (
                    <SubmissionRow
                      key={index}
                      submission={sub.submission}
                      array={array.map((s) => s.submission)}
                      index={index}
                      selectedContest={sub.contestDetails}
                      setIsOpen={() => onOpen(sub.submission)}
                      userID={session.user.id}
                    />
                  )
                })
              ||
              <tr>
                <td colSpan={8} className='border-2 border-slate-600 w-fit px-2 py-2 text-center'>
                  No Submissions Yet
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserSubmissions
