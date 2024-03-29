"use client"
import React, { useEffect } from 'react'
import problemset from './problems.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProblemType } from '@utils/types';

const Tags = [
  "2-sat", "binary search", "bitmasks", "brute force", "chinese remainder theorem", "combinatorics", "constructive algorithms", "data structures", "dfs and similar", "divide and conquer", "dp", "dsu", "expression parsing", "fft", "flows", "games", "geometry", "graph matchings", "graphs", "greedy", "hashing", "implementation", "interactive", "math", "matrices", "meet-in-the-middle", "number theory", "probabilities", "schedules", "shortest paths", "sortings", "string suffix structures", "strings", "ternary search", "trees", "two pointers"
]

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/code/problemset/docker');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
fetchData();

const Problemset = () => {

  return (
    <div className='flex flex-col h-screen justify-between items-center bg-sky-950'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl font-bold my-1.5'>Problem Set</div>

        <Filters />

        {
          problemset.problems.map((problem: ProblemType) => {
            return (
              <div key={problem.id} className='w-full'>
                <Problem data={problem} />
              </div>
            )
          })
        }
      </div>

      <code>{'<<'} {'<'} | 1 | 2 | 3 | 4 | 5 | {'>'} {'>>'}</code>
    </div>
  )
}

const Filters = () => {

  return (
    <div className='p-1 w-full bg-cyan-600 flex flex-col items-center border-y-2 border-slate-400'>
      <div className='flex justify-between w-full mb-2'>
        <span>Difficulty: </span>
        <div>
          <input type='text' min='800' max='3500' className='w-20' />
          <span> to </span>
          <input type='text' min='800' max='3500' className='w-20' />
        </div>
      </div>
      <div className='flex justify-between w-full mb-1'>
        <span>Tags: </span>
        <select className='w-48 text-black'>
          <option value='all'>All</option>
          {
            Tags.map((tag: string) => {
              return (
                <option key={tag} value={tag} className='text-black'>{tag}</option>
              )
            })
          }
        </select>
      </div>
      <button className='bg-sky-950 p-1 mt-1 w-full rounded'>Apply Filters</button>
    </div>
  )
}

const Problem = ({ data }: { data: ProblemType }) => {

  const params = useParams()
  const isSelected = data.id.toString() === params.problemID
  const isAccepted = true;

  return (
    <Link href={`/code/problemset/problems/${data.id}/description`} className={`group w-full py-1 pr-2 flex justify-between items-center border-y-2 border-slate-400 hover:text-cyan-600 hover:bg-white ${isSelected ? "bg-cyan-600" : ""}`} >
      <div className={`w-1 h-12 bg-green-400 mr-1.5`}></div>
      <div className='w-full'>
        <div>{data.id} | {data.name}</div>
        <div className='truncate'>
          {
            data.tags.map((tag: string, index: number) => {
              return (
                <span key={tag} className='text-xs text-slate-300 group-hover:text-cyan-600'>{tag}{index === data.tags.length - 1 ? '' : ', '} </span>
              )
            })
          }
        </div>
      </div>
      <div className='w-20 text-right'>
        {data.difficulty == 0 ? <div><span className='bg-green-500 px-2 rounded-lg group-hover:text-white'>Easy</span></div> :
          data.difficulty == 1 ? <div><span className='bg-yellow-500 px-2 rounded-lg group-hover:text-white'>Medium</span></div> :
          <div><span className='bg-red-500 px-2 rounded-lg group-hover:text-white'>Hard</span></div>
        }
        <FontAwesomeIcon icon={faAngleRight} className="text-s" />
      </div>
    </Link>
  )
}

export default Problemset
