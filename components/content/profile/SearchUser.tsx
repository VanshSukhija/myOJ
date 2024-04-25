"use client"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserType } from '@utils/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const SearchUser = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const params = useParams()

  const searchUser = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/profile/${params.userID}/search/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchInput })
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') throw new Error(data.error)
      setSearchResults(data.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen w-full overflow-auto flex flex-col justify-start items-center gap-3'>
      <nav className='w-full h-fit bg-green-500 flex justify-between items-center py-1.5 px-3 font-bold'>
        <div className='text-2xl'>
          Search User
        </div>
      </nav>

      <div className='w-[90%] text-xl py-2 flex items-center gap-3'>
        <label
          htmlFor="searchInput"
          className='font-bold'
        >
          Find User:
        </label>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          className='bg-black text-white p-1 focus:outline-none ring-1 ring-white focus:ring-green-500 w-1/2'
          placeholder="Username"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.replace(/[\u0800-\uFFFF]/g, ''))}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-white text-2xl font-bold cursor-pointer hover:text-green-500 ${loading ? 'text-green-500' : ''}`}
          onClick={searchUser}
        />
      </div>

      {
        loading ?
          <div>Loading...</div> :
          searchResults.length > 0 &&
          <div className='w-2/3 flex flex-col items-center gap-2'>
            {
              searchResults.map((user: UserType, index: number) => (
                <Link
                  href={`/code/profile/${user.id}`}
                  key={index}
                  className='w-full text-white p-2 flex justify-between items-center hover:text-black hover:bg-white'
                >
                  <img src={user.image} alt="profile picture" width={50} />
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                </Link>
              ))
            }
          </div>
      }
    </div>
  )
}

export default SearchUser
