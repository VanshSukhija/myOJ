"use client"
import React, { useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ContestType, ProblemType } from '@utils/types';
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';
import { ContestContext, ProblemContext } from '@app/code/create/layout'
import { useRouter } from 'next/navigation';
import { Tags } from '@utils/constants';

const NewCreate = () => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname().split('/')
  const tab = pathname[pathname.length - 1]
  const { problem, setProblem } = useContext(ProblemContext);
  const { contest, setContest } = useContext(ContestContext);
  const idx = Number(params.problemID) - 1

  useEffect(() => {
    setProblem(contest.problems[idx])
  }, [])

  useEffect(() => {
    setContest((prev: ContestType) => {
      return {
        ...prev,
        problems: [...prev.problems.slice(0, idx), problem, ...prev.problems.slice(idx + 1)]
      }
    })
  }, [problem])

  const changeProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value
      }
    })
  }

  const validateProblem = (name: string) => {
    if (name === "name") {
      if (problem.problemName.length < 5 || problem.problemName.length > 50) {
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
      if (problem.problemDescription.length < 100) {
        return false
      }
    }

    else if (name === "formatsConstraints") {
      if (problem.inputFormat.length < 50 || problem.outputFormat.length < 50 || problem.constraints.length < 50) {
        return false
      }
    }

    else if (name === "tests") {
      if (problem.testcases.length === 0) {
        return false
      }

      for (const testcase of problem.testcases) {
        if (!testcase.input.length || testcase.input == '\n' || !testcase.expectedOutput.length || testcase.expectedOutput == '\n') {
          return false
        }
      }
    }

    else if (name === "solution") {
      if (problem.solution.length < 50 || problem.tutorial.length < 50) {
        return false
      }
    }

    return true
  }

  const deleteProblem = () => {
    setContest((prev: ContestType) => {
      return {
        ...prev,
        problems: prev.problems.filter((prob: ProblemType) => prob.problemID !== problem.problemID)
      }
    })

    router.push(`/code/create/${contest.contestID}/description`)
  }

  return (
    <main className='text-white w-1/4 overflow-y-auto'>
      <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
        <div className='w-full flex flex-col items-center'>
          <div className='text-2xl font-bold my-1.5 flex items-center'>
            <Link href={`/code/create/${contest.contestID}/description`} className='cursor-pointer'>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-s relative right-20 cursor-pointer"
              />
            </Link>
            <span>Create Problem</span>
          </div>

          <div className='bg-red-500 w-full h-[100%] overflow-y-auto'>
            <div className='w-full flex p-2 pl-0'>
              <div className='w-1 bg-transparent mr-1.5'></div>

              <div className='w-full font-bold'>Problem ID: {problem.problemID}</div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("name") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='problemName' className='font-bold cursor-pointer'>Problem Name:</label>
                <input id='problemName' name='problemName' type='text' className='w-full text-black focus:outline-none px-1' placeholder='The Simplest Problem Of All Time' value={problem.problemName} onChange={changeProblem} />
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("difficulty") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex p-2 pl-0'>
                <label htmlFor='difficulty' className='font-bold w-1/2'>Difficulty: </label>
                <div className='w-1/2 text-right flex justify-end'>
                  <select
                    name="difficultyRating"
                    id="difficulty"
                    className={`${problem.difficulty == 0 ? 'bg-green-500' : problem.difficulty == 1 ? 'bg-yellow-500' : 'bg-red-500'} px-1 focus:outline-none border-2 border-white`} value={problem.difficulty}
                    onChange={(e) => {
                      const select = e.target as HTMLSelectElement
                      setProblem((prev: ProblemType) => {
                        return {
                          ...prev,
                          difficulty: Number(select.value)
                        }
                      })
                    }}>
                    <option value="0" className='bg-green-500 hover:bg-green-500'>Easy</option>
                    <option value="1" className='bg-yellow-500 hover:bg-yellow-500'>Medium</option>
                    <option value="2" className='bg-red-500 hover:bg-red-500'>Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("tags") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='tags' className='font-bold'>Tags: </label> <br />
                <div className='py-1 gap-1 flex flex-wrap'>
                  {
                    problem.tags
                      .split(',')
                      .map((tag: string, idx: number) => {
                        return (
                          tag && <SelectedTags tag={tag} key={idx} setProblem={setProblem} />
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
                      tags: (prev.tags + (prev.tags.length ? ',' : '') + tag).split(',').sort().join(',')
                    }
                  })
                  select.value = ""
                }}>
                  <option value="">Select tags</option>
                  {
                    Tags.filter((t: string) => !problem.tags.split(',').includes(t))
                      .map((tag: string) => {
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
                  <input type="number" id="timeLimit" className='w-1/2 text-black px-1 focus:outline-none' name='timeLimit' value={problem.timeLimit} onChange={changeProblem} step={500} min={0} />
                  <div className='ml-1 w-1/6'>ms</div>
                </div>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("memory limit") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='memoryLimit' className='font-bold'>Memory Limit:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input type="number" id="memoryLimit" className='w-1/2 text-black px-1 focus:outline-none' name='memoryLimit' value={problem.memoryLimit} onChange={changeProblem} step={128} min={0} />
                  <div className='ml-1 w-1/6'>MB</div>
                </div>
              </div>
            </div>

            <Link href={`/code/create/${params.contestID}/problems/${params.problemID}/description`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'description' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("description") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Description</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.contestID}/problems/${params.problemID}/formats`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'formats' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("formatsConstraints") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Formats & Constraints</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.contestID}/problems/${params.problemID}/tests`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'tests' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("tests") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Tests</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.contestID}/problems/${params.problemID}/solution`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'solution' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateProblem("solution") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Solution & Explaination</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>

            <Link href={`/code/create/${params.contestID}/problems/${params.problemID}/note`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'note' ? 'bg-white text-red-500' : ''}`}>
              <div className='w-1 bg-transparent mr-1.5'></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Note</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>
          </div>
        </div>

        <div className='w-full flex text-red-500 font-bold bg-red-900 p-2'>
          <button
            className='bg-white py-1 w-full'
            onClick={deleteProblem}
          >
            Delete
          </button>
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
        tags: prev.tags.split(',').filter((t: string) => t !== tag).sort().join(',')
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
