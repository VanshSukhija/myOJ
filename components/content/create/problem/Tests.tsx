"use client";
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { ProblemContext } from '@app/code/create/layout';
import { ProblemType } from '@utils/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Tests = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleButtonClick = () => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        testcases: [...prev.testcases, {
          id: `${Date.now()}`,
          input: '',
          expectedOutput: '',
        }]
      }
    })
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-red-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Tests
        </div>
      </nav>

      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Tests</div>

      <div className='w-full px-3 mb-10'>
        {problem.testcases.map((test, idx) => (
          <Testcase key={idx} index={idx} data={test} setProblem={setProblem} />
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
      data: { id: string | string[], input: string, expectedOutput: string },
      setProblem: Dispatch<SetStateAction<ProblemType>>
    }
) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        testcases: prev.testcases.map((test: any, idx: number) => {
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

  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/create/api`, {
      method: 'DELETE',
      body: JSON.stringify({ table: `test`, column: `testID`, id: data.id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setProblem((prev: ProblemType) => {
          return {
            ...prev,
            testcases: prev.testcases.filter((_: any, idx: number) => idx !== index)
          }
        });
        console.log(data);
      })
      .catch(err => console.error(err))
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
        value={data.expectedOutput}
        cols={30}
        rows={5}
        placeholder='expected output'
        wrap="true"
        name='expectedOutput'
        onChange={handleChange}
        className='focus:outline-none focus:outline-red-500 focus:border-none resize-none w-1/2 px-2 py-1 overflow-y-auto bg-black text-white border border-white'
      />
    </div>
  )
}

export default Tests
