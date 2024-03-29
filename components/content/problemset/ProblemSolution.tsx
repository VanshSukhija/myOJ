"use client"
import React, { useContext } from 'react'
import { SelectedProblemContext } from '@app/code/problemset/layout';
import { Editor as CodeEditor } from '@monaco-editor/react';


const ProblemSolution = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)

  return (
    <div className='p-1 h-full'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Explanation</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.tutorial || '' }}>
        </div>
      </section>
      <br />

      <section className='h-full flex justify-start flex-col items-center gap-2'>
        <div className='w-full px-3 py-1 border-b-2 border-cyan-600 font-bold text-2xl flex justify-between'>
          Solution
          <select
            className='text-black text-lg font-normal focus:outline-none focus:ring-2 focus:ring-cyan-600 pr-2'
            value={selectedProblem?.solutionLanguage || 'cpp'}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className='w-[90%] h-full max-h-[80%]'>
          <CodeEditor
            language={selectedProblem?.solutionLanguage || 'cpp'}
            value={selectedProblem?.solution}
            theme="vs-dark"
            wrapperProps={{ style: { height: '100%', width: '100%' } }}
            className='w-full h-full text-white border border-white'
            options={{
              wordWrap: 'on',
              readOnly: true
            }}
          />
        </div>
        <br />
      </section>
    </div>
  )
}

export default ProblemSolution