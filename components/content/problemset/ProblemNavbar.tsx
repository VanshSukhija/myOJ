"use client"
import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEllipsisV, faPlay, faThunderstorm } from "@fortawesome/free-solid-svg-icons";
import { notFound, useParams, usePathname } from 'next/navigation'
import Link from 'next/link';
import { codeRunner } from '@utils/functions';
import { SelectedProblemContext } from '@app/code/problemset/layout';
import { SubmissionOutputType } from '@utils/types';

const ProblemNavbar = () => {
  const params = useParams()
  const pathname = usePathname().split('/')
  const { selectedProblem, setSelectedProblem } = useContext(SelectedProblemContext)
  const tab = pathname[pathname.length - 1]

  const [code, setCode] = useState<string>('')
  const [extension, setExtension] = useState<string>('')
  const [outputArray, setOutputArray] = useState<SubmissionOutputType[]>([])

  useEffect(() => {
    setSelectedProblem(null);

    const fetchProblem = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/problems/${params.problemID}/getProblemByID`, {
          method: 'POST',
          body: JSON.stringify({ problemID: params.problemID }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data);
        data.status === 'success' ? setSelectedProblem(() => data.data) : console.error(data.message), notFound();
      } catch (err) {
        console.error(err);
      }
    }

    fetchProblem();
  }, [])

  const runTestCases = async (e: any) => {
    e.preventDefault()
    const output: SubmissionOutputType[] = await codeRunner(selectedProblem!, code, extension)
    setOutputArray(() => output)
  }

  useEffect(() => {
    console.log(outputArray)
  }, [outputArray])

  // useEffect(() => {
  //   console.log(extension)
  // }, [extension])

  // useEffect(() => {
  //   console.log(code)
  // }, [code])

  const getCode = async (event: any) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target?.result as string)
      setCode(text)
      setExtension(event.target?.files[0].name.split('.').pop() as string);
    };
    reader.readAsText(event.target?.files[0])
  }

  return (
    <>
      <nav className='p-1.5 flex justify-between border-b-2 bg-cyan-600'>
        <div className='flex flex-col justify-between gap-1'>
          <div className='text-2xl font-bold'>{selectedProblem?.problemName}</div>
          <div className='text-white'>
            {selectedProblem?.difficulty == 0 ? <span className='bg-green-500 px-2 rounded-lg'>Easy</span> :
              selectedProblem?.difficulty == 1 ? <span className='bg-yellow-500 px-2 rounded-lg'>Medium</span> :
                selectedProblem?.difficulty == 2 ?
                  <span className='bg-red-500 px-2 rounded-lg'>Hard</span> :
                  <span className='bg-gray-500 px-2 rounded-lg'>Unknown</span>
            } |
            {
              selectedProblem?.tags
                .split(',')
                .map((tag: string, index: number) => {
                  return (
                    <span key={tag}> {index == selectedProblem?.tags.split(',').length - 1 ? tag : tag + ','}</span>
                  )
                })
            }
          </div>
          <div className="text-white flex gap-4">
            <div className='w-fit h-fit flex items-center gap-1'>
              <FontAwesomeIcon icon={faClock} title="Time Limit" />
              <code title='Time Limit'>{selectedProblem && selectedProblem.timeLimit / 1000}s</code>
            </div>
            <div className='w-fit h-fit flex items-center gap-1'>
              <FontAwesomeIcon icon={faThunderstorm} title="Memory Limit" />
              <code title='Memory Limit'>{selectedProblem?.memoryLimit}MB</code>
            </div>
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
          <button className={`w-1/6 border-x-2 py-1 px-2 ${tab === 'description' ? 'bg-sky-950' : ''}`}>
            Description
          </button>
        </Link>
        <Link href={`/code/problemset/problems/${params.problemID}/submissions`}>
          <button className={`w-1/6 border-r-2 py-1 px-2 ${tab === 'submissions' ? 'bg-sky-950' : ''}`}>
            Submissions
          </button>
        </Link>
        <Link href={`/code/problemset/problems/${params.problemID}/solution`}>
          <button className={`w-1/6 border-r-2 py-1 px-2 ${tab === 'solution' ? 'bg-sky-950' : ''}`}>
            Solution
          </button>
        </Link>
        <Link href={`/code/problemset/problems/${params.problemID}/ide`}>
          <button className={`w-1/6 border-r-2 py-1 px-2 ${tab === 'ide' ? 'bg-sky-950' : ''}`}>
            IDE
          </button>
        </Link>
      </nav>
    </>
  )
}

export default ProblemNavbar