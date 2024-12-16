"use client"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DisplayBlogType } from '@utils/types'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import React, { useEffect, useState } from 'react'

type UserCommentsType = {
  commentID: string | string[];
  blogID: string | string[];
  description: string;
  contribution: number | null;
  username: string;
  title: string;
  id: string | string[];
  parentComment: string | string[];
}

const UserBlogs = () => {
  const params = useParams()
  const pathname = usePathname()
  const [blogs, setBlogs] = useState<DisplayBlogType[]>([])
  const [comments, setComments] = useState<UserCommentsType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getBlogs = async (retry: number) => {
      if (retry === 0) return
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/blogs/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: params.userID })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setBlogs(data.results[0])
        setComments(data.results[1])
      } catch (error) {
        getBlogs(retry - 1)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getBlogs(3)
  }, [params.userID, pathname])

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
    <div className='h-screen w-full overflow-auto flex flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Blogs & Comments
        </div>
      </nav>

      <nav className='w-full h-fit border-b-2 border-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Blogs
        </div>
      </nav>

      <div className='w-full flex flex-col'>
        {
          loading ?
            <div className='p-2'>Loading...</div> :
            blogs.length === 0 ?
              <div className='p-2'>No Blogs Found</div> :
              blogs.map((blog: DisplayBlogType, index: number) => (
                <div key={index} className='w-full p-2 flex justify-between hover:text-green-500 hover:bg-white'>
                  <div className='flex flex-col justify-between'>
                    <Link
                      key={index}
                      href={`/code/blogs/${blog.blogID}`}
                      className='text-xl font-bold'
                    >
                      {blog.title}
                    </Link>
                    <div>
                      {blog.username}, {timeDifference(blog.blogID as string)}
                    </div>
                  </div>
                  <div className='flex items-center justify-end gap-1'>
                    <FontAwesomeIcon icon={faStar} width={20} height={20} />
                    {blog.contribution || 0}
                  </div>
                </div>
              ))
        }
      </div>

      <nav className='w-full h-fit border-b-2 border-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Comments
        </div>
      </nav>

      <div className='w-full flex flex-col'>
        {
          loading ?
            <div className='p-2'>Loading...</div> :
            comments.length === 0 ?
              <div className='p-2'>No Comments Found</div> :
              comments.map((comment: UserCommentsType, index: number) => (
                <div key={index} className='w-full p-2 flex flex-col justify-between hover:text-green-500 hover:bg-white'>
                  <div className='flex justify-between'>
                    <Link
                      key={index}
                      href={`/code/blogs/${comment.blogID}`}
                      className='text-lg font-bold'
                    >
                      {comment.title}
                    </Link>
                    <div className='flex items-center justify-end gap-1'>
                      <FontAwesomeIcon icon={faStar} width={20} height={20} />
                      {comment.contribution || 0}
                    </div>
                  </div>
                  <div>
                    {comment.username}, {timeDifference(comment.commentID as string)}
                  </div>
                  <div 
                    dangerouslySetInnerHTML={{__html: comment.description}}
                    className='ql-editor border-l-2 border-green-500'
                  />
                </div>
              ))
        }
      </div>
    </div>
  )
}

export default UserBlogs
