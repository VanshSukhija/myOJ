"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { quillFormats, quillModules } from '@utils/constants';
import { useSession } from 'next-auth/react';
import { CommentType } from '@utils/types';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const CommentBox = ({
  setIsCommenting,
  blogID,
  parentComment,
  setComments,
}: {
  setIsCommenting: React.Dispatch<React.SetStateAction<boolean>>,
  blogID: string | string[],
  parentComment: string | null
  setComments: React.Dispatch<React.SetStateAction<Record<string, CommentType[]>>>
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
      const newComment: CommentType = {
        blogID,
        commentID: `${Date.now()}`,
        description: comment,
        hasLiked: null,
        id: session.user.id,
        image: session.user.image,
        username: session.user.name,
        contribution: null,
        parentComment,
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api/postcomment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogID,
          commentID: newComment.commentID,
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
      setComments((prev: Record<string, CommentType[]>) => {
        if(prev[parentComment === null ? 'null' : parentComment]) {
          return {
            ...prev,
            [parentComment === null ? 'null' : parentComment]: [newComment, ...prev[parentComment === null ? 'null' : parentComment]]
          }
        } else {
          return {
            ...prev,
            [parentComment === null ? 'null' : parentComment]: [newComment]
          }
        }
      })
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
