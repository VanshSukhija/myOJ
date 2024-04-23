"use client"
import { faDumpster, faReply, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommentType } from '@utils/types'
import React from 'react'
import CommentBox from '@components/content/blogs/CommentBox'
import { useSession } from 'next-auth/react'

const Comments = ({
  comment,
  likeContent,
  parentComment,
  setParentComment,
  isCommenting,
  setIsCommenting,
  comments,
  setComments
}: {
  comment: CommentType,
  likeContent: (like: number, commentID: string, alreadyLiked: boolean) => Promise<void>,
  parentComment: string | null,
  setParentComment: React.Dispatch<React.SetStateAction<string | null>>,
  isCommenting: boolean,
  setIsCommenting: React.Dispatch<React.SetStateAction<boolean>>,
  comments: Record<string, CommentType[]>,
  setComments: React.Dispatch<React.SetStateAction<Record<string, CommentType[]>>>
}) => {
  const {data: session} = useSession()

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

  const getContribution = (contribution: number | null, hasLiked: number | null) => {
    contribution = contribution || 0
    hasLiked = hasLiked || 0
    return contribution + hasLiked
  }

  const deleteComment = async () => {
    if (!session) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/blogs/api/deletecomment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogID: comment.blogID,
          userID: session.user.id,
          commentID: comment.commentID
        })
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)

      setComments((prev: Record<string, CommentType[]>) => {
        const newComments = prev[parentComment === null ? 'null' : parentComment].filter((cmmt) => cmmt.commentID !== comment.commentID)
        return {
          ...prev,
          [parentComment === null ? 'null' : parentComment]: newComments
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full py-2 pl-1'>
      <div className='border-l-2 border-purple-500 py-2 pl-2'>
        <div className='w-full flex items-center gap-2'>
          <img
            src={comment.image}
            alt={comment.username}
            className='w-8 h-8'
          />
          <span>{comment.username}, {timeDifference(comment.commentID as string)}</span>
        </div>

        <div className='w-full'>
          <div dangerouslySetInnerHTML={{ __html: comment.description }} className='ql-editor' />
        </div>

        <div className='w-full py-2 flex justify-between items-center'>
          <div className='flex gap-3 items-center text-xl'>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`cursor-pointer ${comment.hasLiked === 1 && 'text-green-500'}`}
              onClick={() => likeContent(1, comment.commentID as string, comment.hasLiked === 1)}
            />
            {
              getContribution(comment.contribution, comment.hasLiked)
            }
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={`cursor-pointer ${comment.hasLiked === -1 && 'text-red-500'}`}
              onClick={() => likeContent(-1, comment.commentID as string, comment.hasLiked === -1)}
            />
          </div>
          <div className='flex gap-4 items-center'>
            {
              session && session.user.id === comment.id &&
              <div
                className='flex gap-2 items-center cursor-pointer text-red-500'
                onClick={deleteComment}
              >
                <FontAwesomeIcon icon={faDumpster} />
                Delete
              </div>
            }
            <div
              className='flex gap-2 items-center cursor-pointer'
              onClick={() => {
                setIsCommenting(true)
                setParentComment(comment.commentID as string)
              }}
            >
              <FontAwesomeIcon icon={faReply} />
              Reply
            </div>
          </div>
        </div>

        {
          isCommenting && comment && parentComment === comment.commentID &&
          <div className='w-full h-1/3 mb-10 p-2'>
            <CommentBox
              setIsCommenting={setIsCommenting}
              parentComment={comment.commentID}
              blogID={comment.blogID}
              setComments={setComments}
            />
          </div>
        }

        {
          comments[comment.commentID as string] &&
          comments[comment.commentID as string].length > 0 &&
          comments[comment.commentID as string].map((cmmt, idx) =>
            <Comments
              key={idx}
              comment={cmmt}
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
    </div>
  )
}

export default Comments
