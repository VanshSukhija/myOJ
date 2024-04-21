"use client"
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DisplayBlogType } from '@utils/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState<DisplayBlogType[]>([])

  useEffect(() => {
    const fetchBlogs = async (retry: number) => {
      if (retry === 0) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api`)
        const data = await res.json()
        console.log(data)
        if (data.status === 'error') throw new Error(data.error)
        setAllBlogs(() => data.results)
      } catch (err) {
        fetchBlogs(retry - 1)
        console.log(err)
      }
    }

    fetchBlogs(3)
  }, [])

  return (
    <div className='flex flex-col h-screen justify-between items-center bg-purple-900'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Blogs</div>

        <div className='w-full py-3 flex justify-center items-center bg-purple-500'>
          <Link 
            href={`/code/blogs/new`} 
            className='bg-white text-purple-500 text-center font-bold py-1 w-[90%]'
          >
            New Blog
          </Link>
        </div>

        {
          allBlogs.length > 0 &&
          allBlogs.map((blog: DisplayBlogType, idx: number) => {
            return (
              <BlogListItem key={idx} blog={blog} />
            )
          })
        }

      </div>
    </div>
  )
}

const BlogListItem = ({ blog }: { blog: DisplayBlogType }) => {
  const params = useParams()
  const isSelected: boolean = blog.blogID === params.blogID
  const timeDifference = (str: string) => {
    const date = Number(str)
    const now = Date.now()
    const diff = now - date;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    if (years > 0) return `${years}y ago`
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
    if (months > 0) return `${months}mo ago`
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 0) return `${days}d ago`
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours > 0) return `${hours}h ago`
    const minutes = Math.floor(diff / (1000 * 60))
    if (minutes > 0) return `${minutes}m ago`
    return `Just now`
  }

  return (
    <Link
      href={`/code/blogs/${blog.blogID}`}
      className={`group w-full py-1 px-2 flex justify-between items-center border-y-2 border-slate-400 hover:text-purple-500 hover:bg-white ${isSelected ? `bg-purple-500 text-white` : ""}`}
      title={blog.title}
    >
      <div className='w-5/6'>
        <div className='truncate'>
          {blog.title}
        </div>
        <div className='truncate text-sm text-gray-300 group-hover:text-purple-500'>
          {blog.username} | {timeDifference(blog.blogID as string)}
        </div>
      </div>
      <div className='w-20 text-right'>
        <div className='flex gap-1 justify-end items-center'>
          {blog.contribution === null ? 0 : blog.contribution}
          <FontAwesomeIcon icon={faPeopleGroup} className="text-s" />
        </div>
      </div>
    </Link>
  )
}

export default Blogs
