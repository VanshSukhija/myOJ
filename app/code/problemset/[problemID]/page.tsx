"use client"
import Content from '@components/Content'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  
  return (
    <Content str={`This is problem ${params.problemID}`} />
  )
}

export default page
