import { ResponsivePie } from '@nivo/pie'
import React from 'react'

const SubmissionPie = ({ data, title }: { title: string, data: { id: string, label: string, value: number }[] }) => {

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between'>
        <span className='font-bold text-xl'>{title}</span>
      </div>

      <div className='w-full h-full'>
        <ResponsivePie
          data={data}
          margin={{ top: 10, bottom: 80, left: 10, right: 10 }}
          sortByValue={true}
          innerRadius={0.5}
          padAngle={0.7}
          activeOuterRadiusOffset={5}
          colors={['rgb(34 197 94)', 'rgb(234 179 8)', 'rgb(239 68 68)', 'blue', 'purple', 'orange', 'pink', 'brown']}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 10,
              symbolShape: 'square',
            }
          ]}
          tooltip={e => {
            let { datum: t } = e
            return (
              <div className='text-white bg-gray-800 p-2 rounded-lg'>
                <div className='font-bold'>{t.label}</div>
                <div>{t.value} submission(s)</div>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export default SubmissionPie
