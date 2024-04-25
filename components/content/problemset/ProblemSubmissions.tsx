"use client";
import React, { useContext, useEffect, useState } from 'react'
import { DisplayProblemType, OnlyContestsType, SubmissionsByProblemType } from '@utils/types';
import { useSession } from 'next-auth/react';
import SubmissionRow from '@components/content/problemset/SubmissionRow';
import SubmissionModal from '@components/content/problemset/SubmissionModal';
import IndividualSubmission from '@components/content/problemset/IndividualSubmission';

const ProblemSubmissions = ({
  SelectedProblemContext,
  primaryColor,
  SelectedContestContext
}: {
  SelectedProblemContext: React.Context<{
    selectedProblem: DisplayProblemType | null;
    setSelectedProblem: React.Dispatch<React.SetStateAction<DisplayProblemType | null>>
  }>,
  primaryColor: string,
  SelectedContestContext?: React.Context<{
    selectedContest: OnlyContestsType | null;
    setSelectedContest: React.Dispatch<React.SetStateAction<OnlyContestsType | null>>
  }> | null
}) => {
  const { selectedContest } = SelectedContestContext ? useContext(SelectedContestContext) : { selectedContest: undefined }
  const { selectedProblem } = useContext(SelectedProblemContext)
  const [submissions, setSubmissions] = useState<SubmissionsByProblemType[]>([])
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [submission, setSubmission] = useState<SubmissionsByProblemType | null>(null)
  const [filters, setFilters] = useState<{
    onlyAccepted: boolean,
    onlyUser: boolean,
    language: 'All' | 'cpp' | 'java' | 'py'
  }>({
    onlyAccepted: false,
    onlyUser: false,
    language: 'All'
  })

  useEffect(() => {
    if (!selectedProblem) return
    if (status === 'loading') return
    if (!session) return

    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/problems/${selectedProblem.problemID}/submissions/getSubmissions`, {
          method: 'POST',
          body: JSON.stringify({
            problemID: selectedProblem.problemID,
            startTime: selectedContest ? Number(new Date(selectedContest.startTime).getTime()) : 0,
            endTime: selectedContest ? Number(new Date(selectedContest.endTime).getTime()) : Number(new Date().getTime())
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data);
        data.status === 'success' ? setSubmissions(() => data.data) : console.error(data.error);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSubmissions();
  }, [session, selectedProblem, status])

  const onOpen = (sub: SubmissionsByProblemType) => {
    setSubmission(sub)
    setIsOpen(true)
  }

  const onClose = () => {
    setSubmission(null)
    setIsOpen(false)
  }

  return (
    <div className='p-1'>
      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl flex justify-between items-center`}>
          <span>Submissions</span>
          <div className='font-normal text-lg flex items-center gap-3'>
            <select
              className={`text-white bg-transparent focus:outline-none px-1 border border-${primaryColor} h-fit`}
              value={filters.language}
              onChange={(e) => {
                setFilters(prev => {
                  return {
                    ...prev,
                    language: e.target.value as 'All' | 'cpp' | 'java' | 'py'
                  }
                })
              }}
            >
              <option className='bg-black' value="All">All Languages</option>
              <option className='bg-black' value="cpp">C++</option>
              <option className='bg-black' value="java">Java</option>
              <option className='bg-black' value="py">Python</option>
            </select>
            <span className='flex gap-1'>
              <input
                type="checkbox"
                name="onlyAccepted"
                id="onlyAccepted"
                className='cursor-pointer'
                onChange={() => setFilters(prev => ({ ...prev, onlyAccepted: !prev.onlyAccepted }))}
                value={filters.onlyAccepted === true ? 1 : 0}
              />
              <label htmlFor="onlyAccepted" className='cursor-pointer'>Accepted</label>
            </span>
            <span className='flex gap-1'>
              <input
                type="checkbox"
                name="onlyUser"
                id="onlyUser"
                className='cursor-pointer'
                onChange={() => setFilters(prev => ({ ...prev, onlyUser: !prev.onlyUser }))}
                value={filters.onlyUser === true ? 1 : 0}
              />
              <label htmlFor="onlyUser" className='cursor-pointer'>Yours</label>
            </span>
          </div>
        </div>

        <SubmissionModal isOpen={isOpen} onClose={onClose}>
          <IndividualSubmission submission={submission} onClose={onClose} />
        </SubmissionModal>

        <table className='table-auto border-2 border-slate-600 w-full m-auto my-3'>
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
              submissions.length > 0 && session &&
              submissions
                .filter((sub: SubmissionsByProblemType) => {
                  if (filters.onlyAccepted && sub.verdict !== 0) return false
                  if (filters.onlyUser && sub.id !== session.user.id) return false
                  if (filters.language !== 'All' && sub.language !== filters.language) return false
                  return true
                })
                .map((sub: SubmissionsByProblemType, index: number, array: SubmissionsByProblemType[]) => {
                  return (
                    <SubmissionRow
                      key={index}
                      submission={sub}
                      array={array}
                      index={index}
                      selectedContest={selectedContest}
                      setIsOpen={() => onOpen(sub)}
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
      </section>
    </div>
  )
}

export default ProblemSubmissions