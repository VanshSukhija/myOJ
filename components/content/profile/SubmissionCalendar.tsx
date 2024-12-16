import React, { useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar';

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const SubmissionCalendar = ({
  data
}: {
  data: { submissionDate: string, submissionCount: number }[]
}) => {
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between'>
        <span className='font-bold text-xl'>Submissions Heat Map</span>
        <select
          className='bg-transparent w-[10%] ring-1 ring-green-500 rounded-md focus:outline-none'
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {
            Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, i) => {
              return (
                <option key={i} value={2024 + i} className='bg-black text-white'>
                  {2024 + i}
                </option>
              )
            })
          }
        </select>
      </div>

      <div className='w-full h-full'>
        <ResponsiveCalendar
          data={data.length === 0 ? [] : data.map(item => {
            return {
              day: item.submissionDate,
              value: item.submissionCount
            }
          })}
          from={`${year}-01-01`}
          to={`${year}-12-31`}
          emptyColor="rgba(31,41,45)"
          colors={['#004d00', '#007a00', '#00bd00', '#00ff00']}
          margin={{ left: 20, top: 10, right: 10 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          monthSpacing={0}
          monthBorderWidth={1}
          dayBorderWidth={0}
          minValue={1}
          daySpacing={2}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            }
          ]}
          tooltip={({ day, value }) => {
            return (
              <div className='bg-gray-800 text-white p-2 rounded-lg'>
                <div className='font-bold'>
                  {day}, {Days[new Date(day).getDay()]}
                </div>
                <div>
                  {value} submission(s)
                </div>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export default SubmissionCalendar
