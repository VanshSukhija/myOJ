import { verdictNames } from '@utils/constants'
import { OnlyContestsType, SubmissionsByProblemType } from '@utils/types'
import React from 'react'

const SubmissionRow = ({
  submission,
  array,
  index,
  selectedContest,
  setIsOpen,
  userID
}: {
  submission: SubmissionsByProblemType,
  array: SubmissionsByProblemType[],
  index: number,
  selectedContest: OnlyContestsType | null | undefined,
  setIsOpen: () => void,
  userID: string
}) => {
  const shouldOpen = () => {
    if (!selectedContest) return true
    if (selectedContest && Date.now() > new Date(selectedContest.endTime).getTime()) return true
    if (selectedContest && submission.id === userID) return true
    return false
  }

  return (
    <tr className='text-center'>
      <td className='border-2 border-slate-600 w-fit px-3 py-2'>{array.length - index}</td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{submission.username}</td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{submission.problemName}</td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>
        {
          (new Date(Number(submission.submissionID))).toLocaleDateString() + ' ' + (new Date(Number(submission.submissionID))).toLocaleTimeString()
        }
      </td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{submission.language}</td>
      <td
        className={`border-2 border-slate-600 w-fit px-2 py-2 ${submission.verdict === 0 ? 'text-green-500' : 'text-red-500'}`}
      >
        <span className={`${shouldOpen() && 'underline cursor-pointer'}`} onClick={setIsOpen}>
          {verdictNames[submission.verdict]}
        </span>
      </td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{submission.timeTaken} ms</td>
      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{(Number(submission.memoryUsed) / 1024).toPrecision(3)} MB</td>
    </tr>
  )
}

export default SubmissionRow
