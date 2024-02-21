"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const Description = () => {
  const [content, setContent] = useState<string>('');
  const [isEditor, setIsEditor] = useState<boolean>(true);

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

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  useEffect(() => console.log(content), [content])

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
        <div className='w-1/5 flex justify-evenly'>
          <button className={`w-1/2 h-full rounded-l-md py-1 ${isEditor ? 'bg-white text-red-500' : ''}`} onClick={() => setIsEditor(true)}>Edit</button>
          <button className={`w-1/2 h-full rounded-r-md py-1 ${isEditor ? '' : 'bg-white text-red-500'}`} onClick={() => setIsEditor(false)}>Preview</button>
        </div>
      </nav>

      <div className='w-[90%] h-[80%] max-h-[80%] mt-10'>
        {isEditor ?
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-full text-white"
            id='create-problem-editor'
          /> :
          <div 
            dangerouslySetInnerHTML={{ __html: content }} 
            className='w-full h-full text-white' 
          />
        }
      </div>
    </div>
  )
}

export default Description
