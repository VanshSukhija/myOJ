import { SelectedProblemContext } from '@utils/contexts'
import ProblemSubmissions from '@components/content/problemset/ProblemSubmissions'
import React from 'react'

const page = () => {
  return (
    <ProblemSubmissions SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
  )
}

export default page
