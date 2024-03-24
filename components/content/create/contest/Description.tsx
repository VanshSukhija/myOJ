"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useContext } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { ContestContext } from '@app/code/create/layout';
import { ContestType } from '@utils/types';
import { quillFormats, quillModules } from '@utils/constants';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const Description = () => {
  const { contest, setContest } = useContext(ContestContext);

  const handleEditorChange = (newContent: string) => {
    setContest((prev: ContestType) => {
      return {
        ...prev,
        contestDescription: newContent
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

      <div className='w-full px-3 py-1 mb-3 border-b-2 border-red-500 font-bold text-2xl'>Contest Announcement</div>

      <div className='w-[90%] h-[80%] max-h-[80%] mb-10'>
        <QuillEditor
          value={contest.contestDescription}
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
