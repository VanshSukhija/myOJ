"use client"
import React, { useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ContestType, ProblemType } from '@utils/types';
import { usePathname, useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import { ContestContext } from '@app/code/create/layout'
import { useSession } from 'next-auth/react';

const ContestCreate = () => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname().split('/')
  const tab = pathname[pathname.length - 1]
  const { contest, setContest, hasRendered, setHasRendered } = useContext(ContestContext);
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/contests/api`, {
        method: 'POST',
        body: JSON.stringify({
          contestID: params.contestID
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          setContest(() => {
            return result || emptyContest;
          })
          setHasRendered(true)
        })
        .catch(err => console.log(err))
    }

    !hasRendered && fetchData()
  }, [params.contestID])

  // useEffect(() => console.log(contest), [contest]);

  const emptyProblem: ProblemType = {
    problemID: `${Date.now()}`,
    problemName: "",
    problemDescription: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    difficulty: 0,
    tags: '',
    testcases: [],
    note: "",
    tutorial: "",
    solution: "",
    createdBy: session?.user.id,
    timeLimit: 0,
    memoryLimit: 0
  }

  const emptyContest: ContestType = {
    contestID: `${Date.now()}`,
    contestName: "",
    contestDescription: "",
    createdBy: session?.user.id,
    startTime: "",
    endTime: "",
    registrationTime: "",
    problems: [],
  }

  const changeContestDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContest((prev: ContestType) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const validateContestDetails = (name: string) => {
    if (name === "name") {
      if (contest.contestName.length < 5 || contest.contestName.length > 50) {
        return false
      }
    }

    if (name === "start time") {
      if (contest.startTime.length === 0) {
        return false
      } else if (contest.startTime < new Date().toISOString() || contest.registrationTime > contest.startTime) {
        return false
      }
    }

    if (name === "end time") {
      if (contest.endTime.length === 0) {
        return false
      } else if (contest.endTime < contest.startTime) {
        return false
      }
    }

    if (name === "registration time") {
      if (contest.registrationTime.length === 0) {
        return false
      }
    }

    if (name === "description") {
      if (contest.contestDescription.length < 10) {
        return false
      }
    }

    return true
  }

  const deleteContest = () => {
    setContest(emptyContest)
    router.push('/code/create')
  }

  const createContest = async () => {
    if (!validateContestDetails("name") || !validateContestDetails("start time") || !validateContestDetails("end time") || !validateContestDetails("registration time") || !validateContestDetails("description")) {
      return
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/create/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contest)
    })
    const data = await res.json()
    console.log(data)
    deleteContest();
  }

  const fixDateTime = (datetime: string) => {
    return datetime.replace(':00.000Z', '');
  }

  return (
    <main className='text-white w-1/4 overflow-y-auto'>
      <div className='w-full flex h-screen flex-col items-center justify-between bg-red-900'>
        <div className='w-full flex flex-col items-center'>
          <div className='text-2xl font-bold my-1.5'>Create Contest</div>

          <div className='bg-red-500 w-full h-[100%] overflow-y-auto'>
            <div className='w-full flex p-2 pl-0'>
              <div className='w-1 bg-transparent mr-1.5'></div>

              <div className='w-full font-bold'>Contest ID: {contest.contestID}</div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateContestDetails("name") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full'>
                <label htmlFor='contestName' className='font-bold cursor-pointer'>Contest Name:</label>
                <input
                  id='contestName'
                  name='contestName'
                  type='text'
                  className='w-full text-black focus:outline-none px-1'
                  placeholder='The Easiest Contest Of All Time'
                  value={contest.contestName}
                  onChange={changeContestDetails}
                />
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateContestDetails("registration time") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='registrationTime' className='font-bold'>Registration Time:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input
                    type="datetime-local"
                    id="registrationTime"
                    className='w-full text-black px-1 focus:outline-none'
                    name='registrationTime'
                    value={fixDateTime(contest.registrationTime)}
                    onChange={changeContestDetails}
                  />
                </div>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateContestDetails("start time") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='startTime' className='font-bold'>Start Time:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input
                    type="datetime-local"
                    id="startTime"
                    className='w-full text-black px-1 focus:outline-none'
                    name='startTime'
                    value={fixDateTime(contest.startTime)}
                    onChange={changeContestDetails}
                  />
                </div>
              </div>
            </div>

            <div className='w-full flex p-2 pl-0'>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateContestDetails("end time") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between'>
                <label htmlFor='endTime' className='font-bold'>End Time:</label>
                <div className='w-1/2 text-right flex justify-end'>
                  <input
                    type="datetime-local"
                    id="endTime"
                    className='w-full text-black px-1 focus:outline-none'
                    name='endTime'
                    value={fixDateTime(contest.endTime)}
                    onChange={changeContestDetails}
                  />
                </div>
              </div>
            </div>

            <Link href={`/code/create/${params.contestID}/description`} className={`w-full flex p-2 pl-0 hover:bg-white hover:text-red-500 cursor-pointer ${tab === 'description' ? 'bg-white text-red-500' : ''}`}>
              <div className={`w-1 bg-gray-400 mr-1.5 ${validateContestDetails("description") ? 'bg-green-400' : ''}`}></div>

              <div className='w-full flex justify-between items-center'>
                <span className='font-bold'>Description</span>
                <FontAwesomeIcon icon={faAngleRight} className="text-s" />
              </div>
            </Link>
          </div>

          <div className='w-full mt-1'>
            <div className='font-bold p-1 text-xl flex justify-between items-center'>
              <span>Problems</span>
              <FontAwesomeIcon
                icon={faPlus}
                className="text-s cursor-pointer"
                onClick={() => setContest((prev: ContestType) => {
                  return {
                    ...prev,
                    problems: [...prev.problems, emptyProblem]
                  }
                })} />
            </div>

            <div className='bg-red-500 w-full flex flex-col'>
              {
                contest.problems
                  .filter((prob: ProblemType) => prob.createdBy === session?.user.id)
                  .map((problem: ProblemType, idx: number) => {
                    return (
                      <div key={idx} className='w-full'>
                        <ContestProblems problemData={problem} contestData={contest} index={idx} />
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>

        <div className='w-full flex gap-2 font-bold bg-red-900 p-2'>
          <button className='bg-white text-red-500 py-1 w-full' onClick={createContest}>Create</button>
          <button className='bg-red-500 text-white py-1 w-full' onClick={deleteContest}>Delete</button>
        </div>
      </div>
    </main>
  )
}

const ContestProblems = ({ problemData, contestData, index }: { problemData: ProblemType, contestData: ContestType, index: number }) => {
  return (
    <Link href={`/code/create/${contestData.contestID}/problems/${index + 1}/description`} className={`group w-full p-1 flex justify-between items-center hover:text-red-500 hover:bg-white border-y border-slate-300`}>
      <div className='w-full'>
        <div>{index + 1} | {problemData.problemName}</div>
        <div className='truncate'>
          {
            problemData.tags
              .split(',')
              .map((tag: string, idx: number) => {
                return (
                  tag && <span key={idx} className='text-xs text-slate-300 group-hover:text-red-500'>{tag}{idx === problemData.tags.split(',').length - 1 ? '' : ', '}</span>
                )
              })
          }
        </div>
      </div>
      <div className='w-20 text-right'>
        {problemData.difficulty == 0 ? <div><span className='bg-green-500 px-2 rounded-lg group-hover:text-white'>Easy</span></div> :
          problemData.difficulty == 1 ? <div><span className='bg-yellow-500 px-2 rounded-lg group-hover:text-white'>Medium</span></div> :
            <div><span className='bg-red-600 px-2 rounded-lg group-hover:text-white'>Hard</span></div>
        }
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default ContestCreate
