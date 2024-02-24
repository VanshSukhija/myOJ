"use client";
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { ProblemContext } from '@app/code/create/layout';
import { ProblemType } from '../problemset/ProblemNavbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Tests = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleButtonClick = () => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        testcases: [...prev.testcases, {
          id: prev.testcases.length,
          input: '',
          output: '',
          explaination: ''
        }]
      }
    })
  }

  useEffect(() => {
    console.log(problem)
  }, [problem])

  return (
    <div className='h-screen w-full overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-red-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Tests
        </div>
      </nav>

      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Tests</div>

      <div className='w-full px-3 mb-10'>
        {problem.testcases.map((test, index) => (
          <Testcase index={index} data={test} setProblem={setProblem} />
        ))}

        <button
          className='w-fit h-fit px-5 py-2 bg-red-500 text-white font-bold rounded-md mt-5'
          onClick={handleButtonClick}>
          Add Test
        </button>
      </div>
    </div>
  )
}

const Testcase = (
  { index, data, setProblem }:
    {
      index: number,
      data: { id: number, input: string, output: string, explaination: string },
      setProblem: Dispatch<SetStateAction<ProblemType>>
    }
) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        testcases: prev.testcases.map((test, idx) => {
          if (idx === index) {
            return {
              ...test,
              [name]: value
            }
          }
          return test
        })
      }
    })
  }

  const handleDelete = () => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        testcases: prev.testcases.filter((_, idx) => idx !== index)
      }
    })
  }

  return (
    <div className='flex gap-2 my-2'>
      <div className='w-[4%] flex flex-col gap-2 font-bold'>
        #{index + 1}
        <FontAwesomeIcon 
          icon={faPlus} 
          className='rotate-45 text-red-500 text-xl cursor-pointer'
          title='Delete Test'
          onClick={handleDelete}
        />
      </div>
      <textarea
        value={data.input}
        cols={30}
        rows={5}
        placeholder='input'
        wrap="true"
        name='input'
        onChange={handleChange}
        className='focus:outline-none focus:outline-red-500 focus:border-none resize-none w-1/2 px-2 py-1 overflow-y-auto bg-black text-white border border-white'
      />
      <textarea
        value={data.output}
        cols={30}
        rows={5}
        placeholder='expected output'
        wrap="true"
        name='output'
        onChange={handleChange}
        className='focus:outline-none focus:outline-red-500 focus:border-none resize-none w-1/2 px-2 py-1 overflow-y-auto bg-black text-white border border-white'
      />
    </div>
  )
}

export default Tests
