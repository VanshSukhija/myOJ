"use client"
import { BlogWithActionsType, CommentType } from '@utils/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import React, { useEffect, useState } from 'react'
import { faReply, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import CommentBox from '@components/content/blogs/CommentBox'
import Comments from '@components/content/blogs/Comments'

const ExistingBlog = () => {
  const [blog, setBlog] = useState<BlogWithActionsType | null>(null)
  const { data: session, status } = useSession()
  const params = useParams()
  const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [comments, setComments] = useState<Record<string, CommentType[]>>({ 'null': [] })
  const [parentComment, setParentComment] = useState<string | null>(null)

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

    const fetchComments = async (retry: number) => {
      if (retry === 0) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api/getcomments`, {
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
        setComments(data.comments)
      } catch (err) {
        fetchComments(retry - 1)
        console.log(err)
      }
    }

    fetchBlog(3)
    fetchComments(3)
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

  const likeContent = async (like: number, commentID: string, alreadyLiked: boolean) => {
    if (status === 'loading') return
    if (!session) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api/likeblog`, {
        method: alreadyLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogID: params.blogID,
          id: session.user.id,
          commentID: commentID,
          hasLiked: like
        })
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)

      commentID === '' ?
        setBlog((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            hasLiked: like === prev.hasLiked ? null : like,
          }
        }) :
        setComments((prev: Record<string, CommentType[]>) => {
          const newComments = prev[parentComment === null ? 'null' : parentComment].map((comment) => {
            if (comment.commentID === commentID) {
              return {
                ...comment,
                hasLiked: like === comment.hasLiked ? null : like,
              }
            }
            return comment
          })
          return {
            ...prev,
            [parentComment === null ? 'null' : parentComment]: newComments
          }
        })

    } catch (err) {
      console.log(err)
    }
  }

  const getContribution = (contribution: number | null, hasLiked: number | null) => {
    contribution = contribution || 0
    hasLiked = hasLiked || 0
    return contribution + hasLiked
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-1 flex-col justify-start items-center'>
      <nav className='w-full h-fit bg-purple-500 flex justify-between items-center p-3 font-bold'>
        <div className='text-2xl'>
          {blog?.title || 'Loading...'}
        </div>
      </nav>

      {blog ?
        <div className='w-full p-2 flex items-center gap-3 text-lg border-b-2 border-purple-500'>
          <img
            src={blog.image}
            alt={blog.username}
            className='w-10 h-10'
          />
          <span>{blog.username}, {timeDifference(blog.blogID as string)}</span>
        </div> : 'Loading...'
      }

      <div>
        <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }} className='ql-editor' />
      </div>

      {
        blog &&
        <div className='w-full border-y-2 border-purple-500 py-2 px-3 flex justify-between items-center'>
          <div className='flex gap-3 items-center text-xl'>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`cursor-pointer ${blog.hasLiked === 1 && 'text-green-500'}`}
              onClick={() => likeContent(1, '', blog.hasLiked === 1)}
            />
            {
              blog ? getContribution(blog.contribution, blog.hasLiked) : 0
            }
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={`cursor-pointer ${blog.hasLiked === -1 && 'text-red-500'}`}
              onClick={() => likeContent(-1, '', blog.hasLiked === -1)}
            />
          </div>
          <div
            className='flex gap-2 items-center cursor-pointer'
            onClick={() => {
              setIsCommenting(true)
              setParentComment(null)
            }}
          >
            <FontAwesomeIcon icon={faReply} />
            Comment
          </div>
        </div>
      }

      {
        isCommenting && blog && parentComment === null &&
        <div className='w-full h-1/3 mb-10 p-2'>
          <CommentBox
            setIsCommenting={setIsCommenting}
            parentComment={null}
            blogID={blog.blogID}
            setComments={setComments}
          />
        </div>
      }

      <nav className='w-full h-fit bg-purple-500 flex justify-between items-center px-2 py-1 font-bold'>
        <div className='text-2xl'>
          Comments
        </div>
      </nav>

      {
        comments['null'].length === 0 ?
          <div className='w-full py-3 flex justify-center items-center'>
            No comments yet
          </div> :
          <div className='w-full pr-2 pl-1'>
            {
              comments['null'].map((comment, idx) =>
                <Comments
                  key={idx}
                  comment={comment}
                  likeContent={likeContent}
                  parentComment={parentComment}
                  setParentComment={setParentComment}
                  setIsCommenting={setIsCommenting}
                  isCommenting={isCommenting}
                  comments={comments}
                  setComments={setComments}
                />
              )
            }
          </div>
      }
    </div>
  )
}

export default ExistingBlog
