"use client"
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ProblemType } from '@components/content/problemset/ProblemNavbar';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const Tags = [
  "2-sat", "binary search", "bitmasks", "brute force", "chinese remainder theorem", "combinatorics", "constructive algorithms", "data structures", "dfs and similar", "divide and conquer", "dp", "dsu", "expression parsing", "fft", "flows", "games", "geometry", "graph matchings", "graphs", "greedy", "hashing", "implementation", "interactive", "math", "matrices", "meet-in-the-middle", "number theory", "probabilities", "schedules", "shortest paths", "sortings", "string suffix structures", "strings", "ternary search", "trees", "two pointers"
]

const Create = () => {
  const pathname = usePathname().split('/')
  const tab = pathname[pathname.length-1]

  const [problem, setProblem] = useState<ProblemType>({
    id: 0,
    name: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    difficulty: 0,
    tags: [],
    submissions: [],
    testcases: [],
    note: "",
    tutorial: "",
    solution: ""
  })

  return (
    <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Create Problem</div>

        <div className='bg-red-500 w-full h-[100%] overflow-y-auto'>
          <div className='w-full flex p-2 pl-0 hover:bg-white hover:text-red-500'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full font-bold'>Problem ID: </div>
          </div>

          <div className='w-full flex p-2 pl-0'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full'>
              <label htmlFor='problemName' className='font-bold cursor-pointer'>Problem Name:</label>
              <input id='problemName' type='text' className='w-full text-black focus:outline-none px-1' placeholder='The Simplest Problem Of All Time' />
            </div>
          </div>

          <div className='w-full flex p-2 pl-0'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full'>
              <label htmlFor='difficultyRating' className='font-bold'>Difficulty Rating: </label>
              <input id='difficultyRating' type='range' min={100} max={3000} step={100} defaultValue={100} className='w-full' />
            </div>
          </div>

          <div className='w-full flex p-2 pl-0'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full'>
              <label htmlFor='tags' className='font-bold'>Tags: </label>
              <select id='tags' className='w-full text-black'>
                <option value="">Select tags</option>
                {
                  Tags.map((tag: string) => {
                    return (
                      <option key={tag} value={tag} className='text-black focus:outline-none'>{tag}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className='w-full flex p-2 pl-0'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between'>
              <label htmlFor='timeLimit' className='font-bold'>Time Limit:</label>
              <input type="number" id="timeLimit" className='w-1/2 text-black px-1 focus:outline-none' placeholder='in seconds' />
            </div>
          </div>

          <div className='w-full flex p-2 pl-0'>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between'>
              <label htmlFor='memoryLimit' className='font-bold'>Memory Limit:</label>
              <input type="number" id="memoryLimit" className='w-1/2 text-black px-1 focus:outline-none' placeholder='in MB' />
            </div>
          </div>

          <Link href={`/code/create/description`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab==='description'? 'bg-white text-red-500' : ''}`}>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between items-center'>
              <span className='font-bold'>Description</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-s" />
            </div>
          </Link>

          <Link href={`/code/create/formats`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab==='formats'? '' : ''}`}>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between items-center'>
              <span className='font-bold'>Formats & Constraints</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-s" />
            </div>
          </Link>

          <Link href={`/code/create/testcases`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab==='testcases'? '' : ''}`}>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between items-center'>
              <span className='font-bold'>Testcases</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-s" />
            </div>
          </Link>

          <Link href={`/code/create/solution`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab==='solution'? '' : ''}`}>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between items-center'>
              <span className='font-bold'>Solution & Explaination</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-s" />
            </div>
          </Link>

          <Link href={`/code/create/note`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab==='note'? '' : ''}`}>
            <div className='w-1 bg-gray-400 mr-1.5'></div>

            <div className='w-full flex justify-between items-center'>
              <span className='font-bold'>Note</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-s" />
            </div>
          </Link>
        </div>
      </div>

      <div className='w-full flex justify-evenly text-red-500 font-bold bg-red-900 py-2'>
        <button className='bg-white py-1 w-[45%]'>Preview</button>
        <button className='bg-white py-1 w-[45%]'>Publish</button>
      </div>
    </div>
  )
}

export default Create
