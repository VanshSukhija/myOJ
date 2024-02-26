"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Editor as CodeEditor } from '@monaco-editor/react';
import { ProblemType } from '@utils/types';
import { codeRunner, getProblem } from '@utils/functions';

const ProblemIDE = () => {
  const params = useParams()
  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<string>('cpp')
  const [outputArray, setOutputArray] = useState<string[]>([])

  const data: ProblemType = getProblem(Number(params.problemID))

  const runTestCases = async (e: any) => {
    e.preventDefault()
    const output: string[] = await codeRunner(data, code, language)
    setOutputArray(output)
  }

  useEffect(() => console.log(outputArray), [outputArray]);

  return (
    <section className='p-1 w-full h-full flex flex-col gap-3'>
      <div className='border-b-2 border-cyan-600 font-bold text-2xl flex justify-between items-center'>
        Code Editor
        <select
          className='text-white bg-transparent text-lg font-normal focus:outline-none focus:border border-cyan-500 px-2 h-fit'
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option className='bg-black' value="cpp">C++</option>
          <option className='bg-black' value="java">Java</option>
          <option className='bg-black' value="python">Python</option>
        </select>
      </div>
      <div className='w-5/6 h-full max-h-full mx-auto flex flex-col gap-3'>
        <CodeEditor
          language={language}
          value={code}
          theme="vs-dark"
          wrapperProps={{ style: { height: '100%', width: '100%' } }}
          onChange={(value: string | undefined) => setCode(value || '')}
          className='w-full h-full text-white border border-white'
          options={{
            wordWrap: 'on'
          }}
        />

        <button className='bg-cyan-700 px-2 py-1 rounded-2xl w-fit' onClick={runTestCases}>Submit Code</button>
      </div>

    </section>
  )
}

export default ProblemIDE
