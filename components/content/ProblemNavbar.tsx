"use client"
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import problemset from "@components/dashboard/problems.json"
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link';

export type ProblemType = {
  id: number;
  name: string;
  description: {
    statement: string;
    input: string;
    output: string;
    constraints: string;
  };
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
  note: string;
  tutorial: string;
  solution: string;
}

type TabsType = 'description' | 'submissions' | 'solution'

export function getProblem(id: number) {
  let data: ProblemType = Object()

  const arr = problemset.problems.filter(e => e.id === id)
  if (!arr.length) notFound()
  data = arr[0]

  return data;
}

const ProblemNavbar = () => {
  const params = useParams()
  const data = getProblem(Number(params.problemID))
  const [tab, setTab] = useState<TabsType>('description')

  const [code, setCode] = useState<string>('')
  const [extension, setExtension] = useState<string>('')
  const [outputArray, setOutputArray] = useState<string[]>([])

  const runTestCases = async (e: any) => {
    e.preventDefault()
    setOutputArray([]);
    try {
      for (const testcase of data.testcases) {
        await fetch(`http://localhost:3000/code/problemset/problems/${data.id}/api`, {
          method: 'POST',
          body: JSON.stringify({
            code: code,
            extension: extension,
            input: testcase.input,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => setOutputArray(prev => [...prev, data.output]))
          .catch(err => console.error(err))
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(outputArray)
  }, [outputArray])

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
    <>
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

        <div className='flex items-center w-[30%] text-right justify-evenly'>
          <input type="file" onChange={getCode} />
          <button className='w-[15%] text-xl cursor-pointer' onClick={runTestCases}>
            <FontAwesomeIcon icon={faPlay} title="Submit Code" />
          </button>
          <button className='w-[15%] text-xl cursor-pointer'>
            <FontAwesomeIcon icon={faEllipsisV} title="More..." />
          </button>
        </div>
      </nav>

      <nav className='w-full border-b-2'>
        <Link href={`/code/problemset/problems/${params.problemID}/description`}>
          <button onClick={() => setTab('description')} className={`w-1/6 border-x-2 py-1 px-2 ${tab === 'description' ? 'bg-sky-950' : ''}`}>
            Description
          </button>
        </Link>
        <Link href={`/code/problemset/problems/${params.problemID}/submissions`}>
          <button onClick={() => setTab('submissions')} className={`w-1/6 border-r-2 py-1 px-2 ${tab === 'submissions' ? 'bg-sky-950' : ''}`}>
            Submissions
          </button>
        </Link>
        <Link href={`/code/problemset/problems/${params.problemID}/solution`}>
          <button onClick={() => setTab('solution')} className={`w-1/6 border-r-2 py-1 px-2 ${tab === 'solution' ? 'bg-sky-950' : ''}`}>
            Solution
          </button>
        </Link>
      </nav>
    </>
  )
}

export default ProblemNavbar