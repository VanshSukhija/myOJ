"use client";
import React, { useContext, useState, useEffect } from 'react'
import { Editor as CodeEditor } from '@monaco-editor/react';
import { ProblemContext } from '@app/code/create/layout';
import { ProblemType } from '@utils/types';

const CheckersCode = () => {
  return (
    <div className='w-full h-screen overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-red-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Checker's Code
        </div>
      </nav>

      <Checker />

    </div>
  )
}

const Checker = () => {
  const { problem, setProblem } = useContext(ProblemContext);
  const [language, setLanguage] = useState<string>('cpp');

  const handleEditorChange = (newContent: string | undefined) => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        checkerCode: newContent || ''
      }
    })
  };

  useEffect(() => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        checkerLanguage: language
      }
    })
  }, [language]);

  return (
    <>
      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl flex justify-between'>
        Code
        <select
          className='text-black text-lg font-normal focus:outline-none focus:ring-2 focus:ring-red-500 pr-2'
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <CodeEditor
          language={language}
          value={problem.checkerCode}
          theme="vs-dark"
          wrapperProps={{ style: { height: '100%', width: '100%' } }}
          onChange={(value) => handleEditorChange(value)}
          className='w-full h-full text-white border border-white'
          options={{
            wordWrap: 'on'
          }}
        />
      </div>
      <br />
    </>
  )
}

export default CheckersCode
