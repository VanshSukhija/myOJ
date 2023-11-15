"use client"
import Content from '@components/content/Content'
import ProblemDesc from '@components/content/ProblemDesc'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  
  return (
    <>
      {/* <Content str={`This is problem ${params.problemID}`} /> */}
      <ProblemDesc />
    </>
  )
}

export default page
