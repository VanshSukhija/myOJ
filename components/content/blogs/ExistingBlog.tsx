"use client"
import { BlogWithActionsType } from '@utils/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import React, { useEffect, useState } from 'react'
import { faReply, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const ExistingBlog = () => {
  const [blog, setBlog] = useState<BlogWithActionsType | null>(null)
  const { data: session, status } = useSession()
  const params = useParams()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) return

    const fetchBlog = async (retry: number) => {
      if (retry === 0) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            blogID: params.blogID,
            userID: session.user.id
          })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setBlog(data.results[0])
      } catch (err) {
        fetchBlog(retry - 1)
        console.log(err)
      }
    }

    fetchBlog(3)
  }, [session])

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  const timeDifference = (str: string) => {
    const date = Number(str)
    const now = Date.now()
    const diff = now - date;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    if (years > 0) return `${years} year(s) ago`
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
    if (months > 0) return `${months} month(s) ago`
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 0) return `${days} day(s) ago`
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours > 0) return `${hours} hour(s) ago`
    const minutes = Math.floor(diff / (1000 * 60))
    if (minutes > 0) return `${minutes} minute(s) ago`
    return `Just now`
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-1 flex-col justify-start items-center pb-1'>
      <nav className='w-full h-fit bg-purple-500 flex justify-between items-center p-3 font-bold'>
        <div className='text-2xl'>
          {blog?.title || 'Loading...'}
        </div>
      </nav>

      {blog ?
        <div className='w-full p-2 flex items-center gap-3 text-lg border-b-2 border-purple-500'>
          <img
            src={blog.image}
            alt="Profile Picture"
            className='w-10 h-10'
          />
          <span>{blog.username},</span>
          <span>{timeDifference(blog.blogID as string)}</span>
        </div> : 'Loading...'
      }

      <div>
        <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }} className='ql-editor' />
      </div>

      <div className='w-full border-y-2 border-purple-500 py-2 px-3 flex justify-between items-center'>
        <div className='flex gap-3 items-center text-xl'>
          <FontAwesomeIcon icon={faThumbsUp} className={`cursor-pointer ${blog && blog.hasLiked === 1 && 'text-green-500'}`} />
          {blog?.contribution || 0}
          <FontAwesomeIcon icon={faThumbsDown} className={`cursor-pointer ${blog && blog.hasLiked === -1 && 'text-red-500'}`} />
        </div>
        <div className='flex gap-2 items-center'>
          <FontAwesomeIcon icon={faReply} className='cursor-pointer' />
          Comment
        </div>
      </div>

    </div>
  )
}

export default ExistingBlog
