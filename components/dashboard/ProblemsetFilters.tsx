import { Tags } from '@utils/constants';
import React from 'react'

const ProblemsetFilters = ({ setFilters, filters }: {
  setFilters: React.Dispatch<React.SetStateAction<{
    difficultyMask: string[];
    tags: string[];
  }>>,
  filters: {
    difficultyMask: string[];
    tags: string[];
  }
}) => {

  return (
    <div className='p-1 w-full bg-cyan-600 flex flex-col gap-2 items-center border-y-2 border-slate-400'>
      <div className='flex justify-between w-full items-center'>
        <span>Difficulty: </span>
        <select
          className='text-black focus:outline-none'
          value={'none'}
          onChange={(e) => {
            if (e.target.value === 'none') return;
            setFilters((prev) => {
              return {
                ...prev,
                difficultyMask: e.target.value === 'remove' ?
                  [] :
                  prev.difficultyMask.includes(e.target.value) ?
                    prev.difficultyMask.filter((val) => val !== e.target.value) :
                    [...prev.difficultyMask, e.target.value]
              }
            })
          }}
        >
          <option value="none" className='bg-white text-black'>Select Difficulty</option>
          <option value="remove" className='bg-white text-black'>Clear</option>
          <option value="Easy" className='text-white bg-green-500'>Easy</option>
          <option value="Medium" className='text-white bg-yellow-500'>Medium</option>
          <option value="Hard" className='text-white bg-red-500'>Hard</option>
        </select>
      </div>
      <div className='flex w-full gap-2 justify-end'>
        {
          filters.difficultyMask.length > 0 && filters.difficultyMask.includes('Easy') &&
          <span className='text-white bg-green-500 px-1 rounded'>Easy</span>
        }
        {
          filters.difficultyMask.length > 0 && filters.difficultyMask.includes('Medium') &&
          <span className='text-white bg-yellow-500 px-1 rounded'>Medium</span>
        }
        {
          filters.difficultyMask.length > 0 && filters.difficultyMask.includes('Hard') &&
          <span className='text-white bg-red-500 px-1 rounded'>Hard</span>
        }
      </div>

      <div className='flex justify-between w-full gap-2'>
        <span>Tags: </span>
        <select 
          className='text-black'
          value='none'
          onChange={(e) => {
            if (e.target.value === 'none') return;

            setFilters((prev) => {
              return {
                ...prev,
                tags: e.target.value === 'remove' ?
                  [] :
                  prev.tags.includes(e.target.value) ?
                    prev.tags.filter((val) => val !== e.target.value) :
                    [...prev.tags, e.target.value].sort()
              }
            })
          }}
        >
          <option value='none'>Select Tags</option>
          <option value='remove'>Clear</option>
          {
            Tags.map((tag: string) => {
              return (
                <option key={tag} value={tag} className='text-black'>{tag}</option>
              )
            })
          }
        </select>
      </div>
      <div className='w-full flex justify-end items-center flex-wrap gap-2'>
        {
          filters.tags.length > 0 && filters.tags.map((tag: string) => {
            return (
              <span key={tag} className='text-black bg-white px-1 rounded'>{tag}</span>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProblemsetFilters
