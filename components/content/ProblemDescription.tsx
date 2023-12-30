"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProblem } from '@components/content/ProblemNavbar'
import { ProblemType } from './ProblemNavbar'

const ProblemDescription = () => {
  const params = useParams()
  const [data, setData] = useState<ProblemType>(Object)

  useEffect(() => {
    setData(getProblem(Number(params.problemID)))
  }, [])

  return (
    <div className='p-1'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Statement</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data?.description?.statement}
        </pre>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Input</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data.description?.input}
        </pre>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Output</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data.description?.output}
        </pre>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Constraints</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data.description?.constraints}
        </pre>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Sample Testcases</div>
        <table className='table-auto border-2 border-slate-600 w-3/4 m-auto my-3'>
          <thead>
            <tr>
              <th className='border-2 border-slate-600 w-1/2'>Input</th>
              <th className='border-2 border-slate-600'>Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 border-slate-600'>
                <pre className='whitespace-pre-wrap break-words'>
                  {data.testcases?.length ? data.testcases[0].input : ''}
                </pre>
              </td>
              <td className='border-2 border-slate-600'>
                <pre className='whitespace-pre-wrap break-words'>
                  {data.testcases?.length ? data.testcases[0].output : ''}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <br />

      {data.note &&
        <section>
          <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Note</div>
          <pre className='whitespace-pre-wrap break-words'>
            {data.note}
          </pre>
        </section>
      }
    </div>
  )
}

export default ProblemDescription
