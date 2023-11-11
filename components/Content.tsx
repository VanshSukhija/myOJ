import React from 'react'

const Content = ({ str }: { str: string }) => {
  return (
    <main className="bg-black text-white flex-1">
      {str}
    </main>
  )
}

export default Content
