"use client"
import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProblemType } from '@components/content/problemset/ProblemNavbar';
import problemset from '@components/dashboard/problems.json';
import { notFound, usePathname, useParams } from 'next/navigation'
import Link from 'next/link';
import { ProblemContext } from '@app/code/create/layout'

const Tags = [
  "2-sat", "binary search", "bitmasks", "brute force", "chinese remainder theorem", "combinatorics", "constructive algorithms", "data structures", "dfs and similar", "divide and conquer", "dp", "dsu", "expression parsing", "fft", "flows", "games", "geometry", "graph matchings", "graphs", "greedy", "hashing", "implementation", "interactive", "math", "matrices", "meet-in-the-middle", "number theory", "probabilities", "schedules", "shortest paths", "sortings", "string suffix structures", "strings", "ternary search", "trees", "two pointers"
]

const NewCreate = () => {
  const params = useParams()
  const pathname = usePathname().split('/')
  const tab = pathname[pathname.length - 1]
  const user = "user1"

  // const [problem, setProblem] = useState<ProblemType>({
  //   id: Number(params.problemID),
  //   name: "",
  //   description: "",
  //   inputFormat: "",
  //   outputFormat: "",
  //   constraints: "",
  //   difficulty: 0,
  //   tags: [],
  //   submissions: [],
  //   testcases: [],
  //   note: "",
  //   tutorial: "",
  //   solution: "",
  //   createdBy: "",
  //   timeLimit: 0,
  //   memoryLimit: 0
  // })
  const { problem, setProblem } = useContext(ProblemContext);

  useEffect(() => {
    setProblem({
      id: Number(params.problemID),
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
      solution: "",
      createdBy: "",
      timeLimit: 0,
      memoryLimit: 0
    })
    const fetchProblem = async () => {
      try {
        const arr = problemset.problems.filter((problem: ProblemType) => problem.id === Number(params.problemID))
        if (arr.length === 0) return;
        if (arr[0].createdBy !== user) return notFound();
        setProblem(arr[0])
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblem();
  }, [])

  const changeProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        [name]: type === "number" || type === "range" ? Number(value) : value
      }
    })
  }

  const validateProblem = (name: string) => {
    if (name === "name") {
      if (problem.name.length < 5 || problem.name.length > 50) {
        return false
      } else if (problemset.problems.filter((prob: ProblemType) => problem.name === prob.name && problem.id !== prob.id).length > 0) {
        return false
      }
    }

    else if (name === "difficulty") {
      if (problem.difficulty < 100 || problem.difficulty > 3000) {
        return false
      }
    }

    else if (name === "tags") {
      if (problem.tags.length === 0) {
        return false
      }
    }

    else if (name === "time limit") {
      if (problem.timeLimit === 0) {
        return false
      }
    }

    else if (name === "memory limit") {
      if (problem.memoryLimit === 0) {
        return false
      }
    }

    else if (name === "description") {
      if (problem.description.length < 100) {
        return false
      }
    }

    else if (name === "formatsConstraints") {
      if (problem.inputFormat.length < 10 || problem.outputFormat.length < 10 || problem.constraints.length < 10) {
        return false
      }
    }

    else if (name === "testcases") {
      if (problem.testcases.length === 0) {
        return false
      }
    }

    else if (name === "solution") {
      if (problem.solution.length < 10 || problem.tutorial.length < 10) {
        return false
      }
    }

    return true
  }

  return (
    <main className='text-white w-1/4 overflow-y-auto'>
      <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
        <div className='w-full flex flex-col items-center'>
          <div className='text-2xl font-bold my-1.5'>Create Problem</div>

          <div className='bg-red-500 w-full h-[100%] overflow-y-auto'>
            <div className='w-full flex p-2 pl-0'>
              <div className='w-1 bg-transparent mr-1.5'></div>

              <div className='w-full font-bold'>Problem ID: {problem.id}</div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("name") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='problemName' className='font-bold cursor-pointer'>Problem Name:</label>
                <input id='problemName' name='name' type='text' className='w-full text-black focus:outline-none px-1' placeholder='The Simplest Problem Of All Time' value={problem.name} onChange={changeProblem} />
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("difficulty") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='difficultyRating' className='font-bold'>Difficulty Rating: {problem.difficulty} </label>
                <input id='difficultyRating' type='range' min={100} max={3000} step={100} className='w-full' name='difficulty' value={problem.difficulty} onChange={changeProblem} />
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("tags") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='tags' className='font-bold'>Tags: </label> <br />
                <div className='py-1 gap-1 flex flex-wrap'>
                  {
                    problem.tags.map((tag: string) => {
                      return (
                        <SelectedTags tag={tag} key={tag} setProblem={setProblem} />
                      )
                    })
                  }
                </div>
                <select id='tags' className='w-full text-black' onChange={() => {
                  const select = document.getElementById('tags') as HTMLSelectElement
                  const tag = select.value
                  if (tag === "") return;
                  setProblem((prev: ProblemType) => {
                    return {
                      ...prev,
                      tags: [...prev.tags, tag].sort()
                    }
                  })
                  select.value = ""
                }}>
                  <option value="">Select tags</option>
                  {
                    Tags.filter((t: string) => !problem.tags.includes(t)).map((tag: string) => {
                      return (
                        <option key={tag} value={tag} className='text-black focus:outline-none'>{tag}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("time limit") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='timeLimit' className='font-bold'>Time Limit:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input type="number" id="timeLimit" className='w-1/2 text-black px-1 focus:outline-none' name='timeLimit' value={problem.timeLimit} onChange={changeProblem} />
                  <div className='ml-1 w-1/6'>ms</div>
                </div>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("memory limit") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='memoryLimit' className='font-bold'>Memory Limit:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input type="number" id="memoryLimit" className='w-1/2 text-black px-1 focus:outline-none' name='memoryLimit' value={problem.memoryLimit} onChange={changeProblem} />
                  <div className='ml-1 w-1/6'>MB</div>
                </div>
              </div>
            </div>

            <Link href={`/code/create/${params.problemID}/description`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'description' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("description") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Description</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.problemID}/formats`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'formats' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("formatsConstraints") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Formats & Constraints</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.problemID}/testcases`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'testcases' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("testcases") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Testcases</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.problemID}/solution`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'solution' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("solution") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Solution & Explaination</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.problemID}/note`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'note' ? 'bg-white text-red-500' : ''}`}>
              <div className='w-1 bg-transparent mr-1.5'></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Note</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>
          </div>
        </div>

        <div className='w-full flex text-red-500 font-bold bg-red-900 p-2'>
          <button className='bg-white py-1 w-full'>Review</button>
        </div>
      </div>
    </main>
  )
}

const SelectedTags = ({ tag, setProblem }: { tag: string, setProblem: React.Dispatch<React.SetStateAction<ProblemType>> }) => {
  const removeTag = () => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        tags: prev.tags.filter((t: string) => t !== tag)
      }
    })
  }

  return (
    <div key={tag} className='w-fit bg-red-900 rounded-full font-normal text-[13px] p-1 cursor-pointer hover:bg-white hover:text-red-900' onClick={removeTag}>
      {tag}
      <FontAwesomeIcon icon={faPlus} className="text-s rotate-45 ml-1" />
    </div>
  )
}

export default NewCreate
