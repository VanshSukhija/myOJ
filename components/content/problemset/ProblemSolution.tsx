"use client"
import React, { useContext } from 'react'
import { SelectedProblemContext } from '@app/code/problemset/layout';
import { Editor as CodeEditor } from '@monaco-editor/react';
import { programmingLanguages } from '@utils/constants';

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

      <section className='h-full max-h-[75%] flex justify-start flex-col items-center gap-2'>
        <div className='w-full px-3 py-1 border-b-2 border-cyan-600 font-bold text-2xl'>
          Solution
          ({
            selectedProblem?.solutionLanguage === 'cpp' ? programmingLanguages.cpp :
              selectedProblem?.solutionLanguage === 'java' ? programmingLanguages.java :
                selectedProblem?.solutionLanguage === 'python' ? programmingLanguages.python : ''
          })
        </div>

        <div className='w-[90%] h-full'>
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