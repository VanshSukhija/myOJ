"use client"
import React, { useState, useEffect } from 'react'
import problemset from '../dashboard/problems.json'
import { notFound, useParams } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";

type ProblemType = {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  tags: string[];
  submissions: {
    id: number;
    user: string;
    time: number;
    result: string;
  }[];
  testcases: {
    id: number;
    input: string;
    output: string;
  }[];
  tutorial: string;
  solution: string;
}

const getProblem = (id: number) => {
  const [data, setData] = useState(Object)

  useEffect(() => {
    const arr = problemset.problems.filter(e => e.id === id)
    if (!arr.length) notFound()
    setData(arr[0])
  }, [])

  return data;
}

const ProblemDesc = () => {
  const params = useParams()
  const data = getProblem(Number(params.problemID))

  return (
    <>
      <ProblemNavbar data={data} />
      <div className='p-2'>
        {data.description}
      </div>
    </>
  )
}

const ProblemNavbar = ({ data }: { data: ProblemType }) => {

  const [code, setCode] = useState('')
  const [extension, setExtension] = useState('')

  const submitCode = async (e: any) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/code/problemset/problems/${data.id}/api`, {
      method: 'POST',
      body: JSON.stringify({
        code: code,
        extension: extension,
        input: data.testcases[0].input,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }

  const getCode = async (event: any) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target?.result as string)
      setCode(text)
      setExtension(event.target?.files[0].name.split('.')[1]);
    };
    reader.readAsText(event.target?.files[0])
  }

  return (
    <nav className='p-1.5 flex justify-between border-b-2 bg-cyan-600'>
      <div className='flex flex-col justify-between'>
        <div className='text-2xl font-bold'>{data.name}</div>
        <div className='text-white'>
          {data.difficulty} | {
            data.tags?.map((tag: string) => {
              return (
                <span key={tag}>{tag}, </span>
              )
            })
          }
        </div>
      </div>
      <div className='flex items-center w-1/3 text-right justify-evenly'>
        <div className='flex flex-col w-2/3 gap-1 text-sm'>
          <input type="file" onChange={getCode} />
          <select className='text-black w-full' value={extension}>
            <option value="">Select Language</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <FontAwesomeIcon icon={faPlay} className="text-xl cursor-pointer" title="Submit Code" onClick={submitCode} />
        <FontAwesomeIcon icon={faEllipsisV} className="text-xl cursor-pointer" title='More...' />
      </div>
    </nav>
  )
}

export default ProblemDesc
