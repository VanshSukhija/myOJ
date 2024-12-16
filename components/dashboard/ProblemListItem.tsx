"use client"
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OnlyProblemType } from "@utils/types"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"

const ProblemListItem = ({ problem, index, primaryColor }: { problem: OnlyProblemType, index: number, primaryColor: string }) => {
  const params = useParams()
  const isContestPage = usePathname().includes('contests')
  const isSelected: boolean = problem.problemID === params.problemID

  return (
    <Link
      href={`${isContestPage ? `/code/contests/${problem.contestID}/problems/${problem.problemID}/description` : `/code/problemset/problems/${problem.problemID}/description`}`}
      className={`group w-full py-1 pr-2 flex justify-between items-center border-y-2 border-slate-400 hover:text-${primaryColor} hover:bg-white ${isSelected ? `bg-${primaryColor}` : ""}`}
    >
      <div className={`w-1 h-12 mr-1.5 ${problem.minimumVerdict === null ? '' : problem.minimumVerdict === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <div className='w-full'>
        <div>#{index} | {problem.problemName}</div>
        <div className='truncate'>
          {
            problem.tags
              .split(',')
              .map((tag: string, index: number) => {
                return (
                  <span key={tag} className={`text-xs text-slate-300 group-hover:text-${primaryColor}`}>{tag}{index === problem.tags.split(',').length - 1 ? '' : ', '} </span>
                )
              })
          }
        </div>
      </div>
      <div className='w-20 text-right'>
        {problem.difficulty == 0 ?
          <div><span className='bg-green-500 px-2 rounded-lg group-hover:text-white'>Easy</span></div>
          :
          problem.difficulty == 1 ?
            <div><span className='bg-yellow-500 px-2 rounded-lg group-hover:text-white'>Medium</span></div>
            :
            <div><span className='bg-red-500 px-2 rounded-lg group-hover:text-white'>Hard</span></div>
        }
        <div className='flex gap-1 justify-end items-center'>
          {problem.acceptedSubmissions === null ? 0 : problem.acceptedSubmissions}
          <FontAwesomeIcon icon={faPeopleGroup} className="text-s" />
        </div>
      </div>
    </Link>
  )
}

export default ProblemListItem