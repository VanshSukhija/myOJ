"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProblem } from '@components/content/ProblemNavbar'
import { ProblemType } from './ProblemNavbar'

const ProblemSolution = () => {
  const params = useParams()
  const [data, setData] = useState<ProblemType>(Object)

  useEffect(() => {
    setData(getProblem(Number(params.problemID)))
  }, [])

  return (
    <div className='p-1'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Explanation</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data.tutorial}
        </pre>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Code</div>
        <pre className='whitespace-pre-wrap break-words'>
          {data.solution}
        </pre>
      </section>
    </div>
  )
}

export default ProblemSolution