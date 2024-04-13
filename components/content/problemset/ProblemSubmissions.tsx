"use client";
import React, { useContext, useEffect, useState } from 'react'
import { SelectedProblemContext } from '@app/code/problemset/layout';
import { SubmissionsByProblemType } from '@utils/types';
import { useSession } from 'next-auth/react';
import { verdictNames } from '@utils/constants';

const ProblemSubmissions = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)
  const [submissions, setSubmissions] = useState<SubmissionsByProblemType[]>([])
  const { data: session, status } = useSession()
  const [filterMask, setFilterMask] = useState<number>(0)

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

  return (
    <div className='p-1'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl flex justify-between items-center'>
          <span>Submissions</span>
          <div className='font-normal text-lg flex items-center gap-3'>
            <span className='flex gap-1'>
              <input
                type="checkbox"
                name="onlyAccepted"
                id="onlyAccepted"
                className='cursor-pointer'
                onChange={() => setFilterMask(prev => prev ^ 1)}
                value={filterMask & 1}
              />
              <label htmlFor="onlyAccepted" className='cursor-pointer'>Accepted</label>
            </span>
            <span className='flex gap-1'>
              <input
                type="checkbox"
                name="onlyUser"
                id="onlyUser"
                className='cursor-pointer'
                onChange={() => setFilterMask(prev => prev ^ 2)}
                value={filterMask & 2}
              />
              <label htmlFor="onlyUser" className='cursor-pointer'>Yours</label>
            </span>
          </div>
        </div>
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
              submissions.length > 0 &&
              submissions.filter((sub: SubmissionsByProblemType) => (filterMask & 1 ? sub.verdict === 0 : true) && (filterMask & 2 ? sub.id === session?.user.id : true))
                .map((sub: SubmissionsByProblemType, index: number, arr: SubmissionsByProblemType[]) => {
                  return (
                    <tr key={index} className='text-center'>
                      <td className='border-2 border-slate-600 w-fit px-3 py-2'>{arr.length - index}</td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{sub.username}</td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{sub.problemName}</td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>
                        {
                          (new Date(Number(sub.submissionID))).toLocaleDateString() + ' ' + (new Date(Number(sub.submissionID))).toLocaleTimeString()
                        }
                      </td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{sub.language}</td>
                      <td className={`border-2 border-slate-600 w-fit px-2 py-2 ${sub.verdict === 0 ? 'text-green-500' : 'text-red-500'}`}>{verdictNames[sub.verdict]}</td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{sub.timeTaken} ms</td>
                      <td className='border-2 border-slate-600 w-fit px-2 py-2'>{(Number(sub.memoryUsed) / 1024).toPrecision(3)} MB</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ProblemSubmissions