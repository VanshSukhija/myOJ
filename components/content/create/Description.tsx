"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useContext } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { ProblemContext } from '@app/code/create/layout';
import { ProblemType } from '@utils/types';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ formula: 'latex' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'formula',
  'script',
  'list',
  'bullet',
  'link',
  'image',
  'code-block',
];

const Description = () => {
  const { problem, setProblem } = useContext(ProblemContext);

  const handleEditorChange = (newContent: string) => {
    setProblem((prev: ProblemType) => {
      return {
        ...prev,
        description: newContent
      }
    })
  };

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  return (
    <div className='h-screen w-full overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-red-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Description
        </div>
      </nav>

      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Problem Statement</div>

      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <QuillEditor
          value={problem.description}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="create-problem-editor w-full h-full text-white"
        />
      </div>
      <br />
    </div>
  )
}

export default Description
