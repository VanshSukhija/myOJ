"use client"
import React, { useState, useEffect } from 'react'
import problemset from '../dashboard/problems.json'
import { notFound, useParams } from 'next/navigation'

const ProblemDesc = () => {
  const params = useParams()
  // console.log(params)
  const [data, setData] = useState(Object)

  useEffect(() => {
    const arr = problemset.problems.filter(e => e.id.toString() === params.problemID)
    if(!arr.length) notFound()
    setData(arr[0])
  }, [])

  // useEffect(() => {
  //   console.log(data.tags)
  // }, [data])

  return (
    <>
      <nav className='p-1.5 flex justify-between border-b-2 bg-cyan-600'>
        <div className='flex flex-col justify-between'>
          <div className='text-2xl font-bold'>{data.name}</div>
          <div className='text-white'>
            {data.difficulty} | {
              data.tags?.map((tag: string) => {
                return (
                  <span>{tag}, </span>
                )
              })
            }
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <input type="file" />
          <button className='bg-white text-black px-1 w-full'>Submit</button>
        </div>
      </nav>
    </>
  )
}

export default ProblemDesc
