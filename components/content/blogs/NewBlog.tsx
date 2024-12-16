"use client"
import React, { useEffect, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { quillFormats, quillModules } from '@utils/constants';
import dynamic from 'next/dynamic';
import { BlogType } from '@utils/types';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

const QuillEditor: any = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const NewBlog = () => {
  const { data: session } = useSession()
  const params = useParams()
  const router = useRouter()

  const [blog, setBlog] = useState<BlogType>({
    blogID: '',
    title: '',
    content: '',
    createdBy: ''
  })

  useEffect(() => {
    if(!params.blogID) return

    const getBlog = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/${params.blogID}/edit/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ blogID: params.blogID })
        })
        const data = await res.json()
        if(data.status === 'error') throw new Error(data.error)
        setBlog(data.results[0])
      } catch (error) {
        console.log(error)
      }
    }

    getBlog()
  }, [params])

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  const publishBlog = async () => {
    if(!session) return
    if(blog.title.trim() === '') return alert('Title cannot be empty')
    if(blog.content.trim() === '') return alert('Content cannot be empty')

    const blogID: string = `${Date.now()}`

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/new/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogID,
          title: blog.title,
          content: blog.content,
          createdBy: session.user.id
        })
      })
      const data = await res.json()
      console.log(data);
      if(data.status === 'error') throw new Error(data.error)
      alert('Blog Published Successfully')
      router.push(`/code/blogs/${blogID}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-col justify-start items-center gap-3'>
      <nav className='w-full h-fit bg-purple-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          {params.blogID ? 'Edit Blog' : 'New Blog'}
        </div>
      </nav>

      <div className='w-[90%] text-xl py-2 flex items-center gap-2'>
        <label
          htmlFor="titleInput"
          className='font-bold'
        >
          Title:
        </label>
        <input
          type="text"
          name="titleInput"
          id="titleInput"
          className='bg-black text-white p-1 focus:outline-none ring-1 ring-white focus:ring-purple-500 w-1/2'
          placeholder="My First Blog :)"
          value={blog.title}
          onChange={(e) => e.target.value.length <= 255 && setBlog(prev => ({
            ...prev,
            title: e.target.value.replace(/[\u0800-\uFFFF]/g, '')
          }))}
        />
      </div>

      <div className='w-[90%] h-full max-h-[80%] mb-10'>
        <QuillEditor
          value={blog.content}
          onChange={(content: string) => setBlog(prev => ({
            ...prev,
            content: content.replace(/[\u0800-\uFFFF]/g, '')
          }))}
          modules={quillModules}
          formats={quillFormats}
          className="new-blog-editor w-full h-full text-white"
        />
      </div>

      <button
        className='w-fit h-fit px-5 py-2 bg-purple-500 text-white font-bold rounded-md'
        onClick={publishBlog}
      >
        Publish Blog
      </button>

      <br />
    </div>
  )
}

export default NewBlog
