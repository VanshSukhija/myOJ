"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { quillFormats, quillModules } from '@utils/constants';
import { useSession } from 'next-auth/react';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const CommentBox = ({
  setIsCommenting,
  blogID,
  parentComment
}: {
  setIsCommenting: React.Dispatch<React.SetStateAction<boolean>>,
  blogID: string | string[],
  parentComment: string | null
}) => {
  const [comment, setComment] = useState<string>('')
  const { data: session, status } = useSession()

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  const postComment = async () => {
    if (status === 'loading') return
    if (!session) return
    if (!comment) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api/postcomment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogID,
          commentID: `${Date.now()}`,
          id: session.user.id,
          description: comment,
          parentComment
        })
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)
      setComment('')
      setIsCommenting(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center gap-10'>
      <QuillEditor
        value={comment}
        onChange={(newContent: string) => setComment(newContent.replace(/[\u0800-\uFFFF]/g, ''))}
        modules={quillModules}
        formats={quillFormats}
        className="new-blog-editor w-full h-full text-white"
      />
      <div className='w-full flex justify-start gap-3 py-2'>
        <button 
          className='bg-white text-purple-500 w-[10%] min-w-fit font-bold'
          onClick={postComment}
        >
          Post
        </button>
        <button 
          className='bg-white text-purple-500 w-[10%] min-w-fit font-bold'
          onClick={() => {
            setComment('')
            setIsCommenting(false)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CommentBox
