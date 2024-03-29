"use client";
import React, { useContext } from 'react'
import submissions from '@components/content/problemset/submissions.json'
import { SelectedProblemContext } from '@app/code/problemset/layout';

const ProblemSubmissions = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)

  return (
    <div className='p-1'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Submissions</div>
        <table className='table-auto border-2 border-slate-600 w-full m-auto my-3'>
          <thead>
            <tr>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Submission ID</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>User</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Problem ID</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Submission Time</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Language</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Verdict</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Time Taken</th>
              <th className='border-2 border-slate-600 w-[10%] px-1 py-2'>Memory Used</th>
            </tr>
          </thead>

          <tbody>
            {
              submissions.data.map(sub => {
                return (
                  <tr key={sub.submission_id} className='text-center'>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.submission_id}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.user_id}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.problem_id}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.submission_time}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.language}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.verdict}</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.time_taken}ms</td>
                    <td className='border-2 border-slate-600 w-[10%] px-1 py-2'>{sub.memory_used}KB</td>
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