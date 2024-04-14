import { SelectedProblemContext } from '@app/code/problemset/layout'
import ProblemSubmissions from '@components/content/problemset/ProblemSubmissions'
import React from 'react'

const page = () => {
  return (
    <ProblemSubmissions SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
  )
}

export default page
