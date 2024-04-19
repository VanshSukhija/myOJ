"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useContext } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { ProblemContext } from '@app/code/create/layout';
import { ProblemType } from '@utils/types';
import { quillModules, quillFormats } from '@utils/constants';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const FormatsConstraints = () => {
  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  return (
    <div className='w-full h-screen overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-red-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Formats & Constraints
        </div>
      </nav>

      <InputFormat />

      <OutputFormat />

      <Constraints />
    </div>
  )
}

const InputFormat = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleEditorChange = (newContent: string) => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        inputFormat: newContent.replace(/[\u0800-\uFFFF]/g, '')
      }
    })
  };

  return (
    <>
      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Input Format</div>
      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <QuillEditor
          value={problem.inputFormat}
          onChange={(newContent: string) => handleEditorChange(newContent)}
          modules={quillModules}
          formats={quillFormats}
          className="create-problem-editor w-full h-full text-white"
        />
      </div>
      <br />
    </>
  )
}

const OutputFormat = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleEditorChange = (newContent: string) => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        outputFormat: newContent.replace(/[\u0800-\uFFFF]/g, '')
      }
    })
  };

  return (
    <>
      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Output Format</div>
      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <QuillEditor
          value={problem.outputFormat}
          onChange={(newContent: string) => handleEditorChange(newContent)}
          modules={quillModules}
          formats={quillFormats}
          className="create-problem-editor w-full h-full text-white"
        />
      </div>
      <br />
    </>
  )
}

const Constraints = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleEditorChange = (newContent: string) => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        constraints: newContent.replace(/[\u0800-\uFFFF]/g, '')
      }
    })
  };

  return (
    <>
      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Constraints</div>
      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <QuillEditor
          value={problem.constraints}
          onChange={(newContent: string) => handleEditorChange(newContent)}
          modules={quillModules}
          formats={quillFormats}
          className="create-problem-editor w-full h-full text-white"
        />
      </div>
      <br />
    </>
  )
}

export default FormatsConstraints
