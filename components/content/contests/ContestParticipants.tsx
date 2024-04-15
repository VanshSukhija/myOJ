import { UserType } from '@utils/types'
import React from 'react'

const ContestParticipants = ({ participants }: { participants: UserType[] }) => {
  return (
    <div className='p-3'>
      <table className='text-white m-auto border-2 border-slate-600 w-full table-auto'>
        <thead>
          <th className='border-2 border-slate-600'>#</th>
          <th className='border-2 border-slate-600'>Username</th>
          <th className='border-2 border-slate-600'>Email ID</th>
        </thead>
        <tbody>
          {
            participants.length > 0 ?
            participants.map((participant, index) => (
              <tr key={index} className={`hover:bg-pink-900 cursor-pointer ${index&1 ? 'bg-gray-800' : 'bg-black'}`}>
                <td className='text-center border-2 border-slate-600 py-1'>{index + 1}</td>
                <td className='text-center border-2 border-slate-600 py-1'>{participant.name}</td>
                <td className='text-center border-2 border-slate-600 py-1'>{participant.email}</td>
              </tr>
            )) : 
            <tr>
              <td className='text-center border-2 border-slate-600 py-1' colSpan={3}>
                No Participants
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ContestParticipants
